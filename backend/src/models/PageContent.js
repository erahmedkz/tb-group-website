import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const PageContent = sequelize.define('PageContent', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    page: {
        type: DataTypes.STRING,
        allowNull: false
    },
    section: {
        type: DataTypes.STRING,
        allowNull: false
    },
    key: {
        type: DataTypes.STRING,
        allowNull: false
    },
    value: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    type: {
        type: DataTypes.ENUM('text', 'image', 'html'),
        defaultValue: 'text'
    }
}, {
    tableName: 'page_contents',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['page', 'section', 'key']
        }
    ]
})

export default PageContent
