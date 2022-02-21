const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const SECRET1 = 'secret1'
const SECRET2 = 'secret2'

const createTokens = async (email, password, id) => {
    const newToken = jwt.sign(
        {userInfo: {email, password, id}},
        SECRET1,
        {expiresIn: '1h'}
    )

    const refreshToken = jwt.sign(
        {userInfo: {email, password, id}},
        SECRET2,
        {expiresIn: '7d'}
    )

    return [newToken, refreshToken]
}

const refreshTokens = async (token, refreshToken, models, SECRET1, SECRET2) => {
    let userId = 0;
    try {
        const {user: {id}} = jwt.decode(refreshToken);
        userId = id
    } catch (err) {
        return {}
    }

    if (!userId) {
        return {}
    }

    const user = await models.User.findOne({where: {id: userId}, raw: true})

    if (!user) {
        return {}
    }

    const refreshSecret = user.password + SECRET1

    try {
        jwt.verify(refreshToken, refreshSecret)
    } catch (err) {
        return {}
    }

    const [newToken, newRefreshToken] = await createTokens(user, SECRET2, refreshSecret)

    return {
        token: newToken,
        refreshToken: newRefreshToken,
        user
    }
}

module.exports = {createTokens, refreshTokens}