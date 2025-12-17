import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Review = sequelize.define('Review', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    company: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: true
    },
    rating: {
        type: DataTypes.INTEGER,
        defaultValue: 5,
        validate: { min: 1, max: 5 }
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('text', 'video'),
        defaultValue: 'text'
    },
    videoUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    videoFile: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isApproved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isFromUser: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    order: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'reviews',
    timestamps: true
})

export default Review
