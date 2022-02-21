const {gql} = require('apollo-server-express')

module.exports = REGISTER_USER = gql`
    type Registration{
        email : String
        password : String
        id : ID 
        ok : Boolean
        errors: [Error!]
    }
    
    type Login {
        email : String
        password : String
        token : String!
        refreshToken : String!
        ok : Boolean
        errors : [Error!]
    }

    type Error {
        path : String!
        message : String!
    }
    
    type Mutation {
        registration(registerCredentials : registerInput) : Registration
        login(loginCredentials : loginInput) : Login
    }
    
    input registerInput {
        email : String!
        password : String!
    }

    input loginInput {
        email : String!
        password : String!
    }
    

`