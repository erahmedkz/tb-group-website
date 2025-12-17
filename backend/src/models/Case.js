import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Case = sequelize.define('Case', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    client: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('moysklad', 'bitrix24', 'telephony'),
        allowNull: false
    },
    problem: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    solution: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    result: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isPublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    order: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'cases',
    timestamps: true
})

export default Case
