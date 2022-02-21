const {createTokens} = require('../../auth')
const uuid4 = require('uuid4')

module.exports = {
    Mutation: {
        registration: async (parents, args, {models}, info) => {
            try {
                const {password, email} = args.registerCredentials
                const id = uuid4()
                const newUser = {
                    email,
                    password,
                    firstName: 'firstname test',
                    lastName: 'lastname test',
                    id
                }
                models.User.create(newUser)
                return {
                    email,
                    password,
                    id,
                    ok: true
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
}