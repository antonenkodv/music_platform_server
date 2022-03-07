const Sequelize = require('sequelize')
const TrackModel = require('./track')
const UserModel = require('./user')
require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.USER_NAME, process.env.USER_PASSWORD, {
    dialect: 'postgres',
    host: 'localhost',
    port: Number(5432),
})

const models = {
    Track: TrackModel(sequelize, Sequelize.DataTypes),
    User: UserModel(sequelize, Sequelize.DataTypes)
}

Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models)
    }
})

models.sequelize = sequelize
models.Sequelize = Sequelize

module.exports = {models}
