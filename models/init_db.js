const Sequelize = require('sequelize')
const TrackModel = require('./track')
const UserModel = require('./user')

const sequelize = new Sequelize(process.env.REACT_APP_NAME_DATABASE, process.env.REACT_APP_USERNAME, process.env.REACT_APP_PASSWORD, {
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
