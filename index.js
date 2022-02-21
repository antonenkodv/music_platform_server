const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const {ApolloServer} = require('apollo-server-express');
const {models} = require('./models/init_db')
const typeDefs = require('./gqlSchema/TypeDefs')
const resolvers = require('./gqlSchema/Resolvers')
const {makeExecutableSchema} = require('graphql-tools')
const jwt = require('jsonwebtoken')
const app = express();
const {graphqlUploadExpress} = require('graphql-upload');
const {refreshTokens }= require('./auth')
const corsOptions = {
    origin: '*',
    credentials: true,
    exposedHeaders: ['x-token', 'x-refresh-token']
}
app.use(cors(corsOptions))
app.use(express.static("public"))

const SECRET1 = 'secret1'
const SECRET2 = 'secret2'

const addUser = async (req, res, next) => {
    const token = req.headers['x-token']
    if (token) {
        try {
            const {userInfo, iat: createdAt, exp: expiredAt} = jwt.verify(token, SECRET1)
            req.user = userInfo
        } catch (err) {
            console.log(err)
            const refreshToken = req.headers['x-refresh-token']
            const newTokens = await refreshTokens(token, refreshToken, models, SECRET1, SECRET1)
            if (newTokens.token && newTokens, refreshToken) {
                res.set('x-token', 'test-x-token')
                res.set('x-refresh-token', 'text-x-refresh-token')
            }
            req.user = newTokens.user
        }
    }
    next()
}
app.use(addUser)

app.use('./graphql', bodyParser.json())
app.use(graphqlUploadExpress());

const server = new ApolloServer({//initialized apollo server
    schema: makeExecutableSchema(
        {
            typeDefs,
            resolvers,
        }),
    context: ({req, res}) => ({
        models: models,
        user: req.user
    })
})
const PORT = 5000

async function start() {
    try {
        await server.start()
        server.applyMiddleware({app})

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    } catch (error) {
        console.error('ERROR:', error)
    }
}

models.sequelize.sync().then(async () => await start())


