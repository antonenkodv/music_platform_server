const {UUID} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const Track = sequelize.define('tracks', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        name: {type: DataTypes.STRING},
        author: {type: DataTypes.STRING},
        picture_path: {type: DataTypes.STRING},
        audio_path: {type: DataTypes.STRING},
        userId : {type: DataTypes.UUID}
    })

    return Track
}
