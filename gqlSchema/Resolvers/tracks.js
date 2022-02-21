module.exports = {
    Query: {
        getAllTracks: async (parents, args, {models}, info) => {
            const allTracks = await models.Track.findAll()
            return allTracks
        }
    },
    Mutation: {
        createNewTrack: async (parents, args, context, info) => {
            const {name, author, text, audio_path, picture_path} = args.input
            const newTrack = {name, author, text, audio_path, picture_path}
            context.models.Track.create(newTrack)
        }
    },

}
