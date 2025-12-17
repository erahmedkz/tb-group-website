import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

// ========== BITRIX24 CRM INTEGRATION ==========
export const sendToBitrix24 = async (formData) => {
    const webhookUrl = process.env.BITRIX24_WEBHOOK_URL

    if (!webhookUrl) {
        console.log('Bitrix24 webhook not configured, skipping...')
        return null
    }

    try {
        const leadData = {
            fields: {
                TITLE: `Заявка с сайта: ${formData.name}`,
                NAME: formData.name,
                PHONE: [{ VALUE: formData.phone, VALUE_TYPE: 'WORK' }],
                EMAIL: formData.email ? [{ VALUE: formData.email, VALUE_TYPE: 'WORK' }] : [],
                COMMENTS: formData.message || '',
                SOURCE_ID: 'WEB',
                STATUS_ID: 'NEW',
                UF_CRM_LEAD_SERVICE: formData.service || ''
            }
        }

        const response = await fetch(`${webhookUrl}crm.lead.add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(leadData)
        })

        const result = await response.json()

        if (result.result) {
            console.log('✅ Lead created in Bitrix24:', result.result)
            return result.result
        } else {
            console.error('Bitrix24 error:', result.error_description || result.error)
            return null
        }
    } catch (error) {
        console.error('Bitrix24 request failed:', error.message)
        return null
    }
}

// ========== EMAIL NOTIFICATIONS ==========
let transporter = null

const getTransporter = () => {
    if (transporter) return transporter

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
        console.log('SMTP not configured, email notifications disabled')
        return null
    }

    transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: parseInt(SMTP_PORT) || 587,
        secure: false,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS
        }
    })

    return transporter
}

export const sendEmailNotification = async (formData) => {
    const transport = getTransporter()

    if (!transport) {
        return false
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@tbgroup.kz'

    const mailOptions = {
        from: process.env.EMAIL_FROM || 'TB Group <noreply@tbgroup.kz>',
        to: adminEmail,
        subject: `Новая заявка с сайта: ${formData.name}`,
        html: `
      <h2>Новая заявка с сайта TB Group</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Имя:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${formData.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Телефон:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${formData.phone}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Email:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${formData.email || '-'}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Услуга:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${formData.service || '-'}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Сообщение:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${formData.message || '-'}</td>
        </tr>
      </table>
      <p style="margin-top: 20px; color: #666;">Это автоматическое уведомление с сайта tbgroup.kz</p>
    `
    }

    try {
        await transport.sendMail(mailOptions)
        console.log('✅ Email notification sent to:', adminEmail)
        return true
    } catch (error) {
        console.error('Email send failed:', error.message)
        return false
    }
}

// ========== DATABASE BACKUP ==========
import { exec } from 'child_process'
import path from 'path'
import fs from 'fs'

export const createDatabaseBackup = () => {
    const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env

    if (!DB_NAME) {
        console.error('Database not configured for backup')
        return null
    }

    const backupDir = path.join(process.cwd(), 'backups')
    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true })
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const filename = `backup-${DB_NAME}-${timestamp}.sql`
    const filepath = path.join(backupDir, filename)

    const command = `PGPASSWORD="${DB_PASSWORD}" pg_dump -h ${DB_HOST || 'localhost'} -p ${DB_PORT || 5432} -U ${DB_USER || 'postgres'} -d ${DB_NAME} -f "${filepath}"`

    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error('Backup failed:', error.message)
                reject(error)
            } else {
                console.log('✅ Database backup created:', filename)
                resolve(filepath)
            }
        })
    })
}
