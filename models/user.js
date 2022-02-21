const {Sequelize, DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true
        },
        firstName: {type: DataTypes.STRING},
        lastName: {type: DataTypes.STRING},
        password: {type: DataTypes.STRING},
        email: {type: DataTypes.STRING}
    })

    User.associate = models => {
        User.hasMany(models.Track, {
            foreignKey : "userId",
            sourceKey : "id"
        })
    }

    return User
}