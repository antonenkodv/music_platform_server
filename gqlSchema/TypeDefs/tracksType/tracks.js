const {gql} = require('apollo-server-express')

module.exports = gql`
    # Types
    type Track {
        id: ID
        name : String
        author : String
        picture_path : String
        audio_path : String
    }
    # Queries
    type Query {
        getAllTracks: [Track]
    }
    # Mutations
    type Mutation {
        createNewTrack(input : createNewTrackInput ): Track
    }
    # Inputs
    input createNewTrackInput {
        name : String
        author : String
        text : String
        picture_path : String   
        audio_path : String
    }
`
