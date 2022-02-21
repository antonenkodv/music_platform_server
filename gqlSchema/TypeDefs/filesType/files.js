const {gql} = require('apollo-server-express')

module.exports = gql`
    scalar Upload

    type File {
        filename: String!
        mimetype: String
        encoding: String
        filepath: String!
    }  
    
    type Error {
        path : String!
        message : String!
    }

    type singleUploadResponse {
        ok: Boolean!
        path: File
        errors: [Error!]
    }
    type multipleUploadResponse {
        ok: Boolean!
        path: [File!]
        errors: [Error!]
    }
    type Query {
        otherFields: Boolean!
    }

    type Mutation {
        singleUpload(file: Upload! ): singleUploadResponse
        multipleUpload(files : [Upload!]!) : multipleUploadResponse
    }

    
    input newTrackInput {
        name : String
        author : String
        text : String
    }
`;
