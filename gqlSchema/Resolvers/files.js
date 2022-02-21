const {GraphQLUpload} = require('graphql-upload');
const path = require('path')
const fs = require('fs')
const uuid4 = require("uuid4");

async function writeFileToPublic(createReadStream, title, mimetype) {
    const fileType = mimetype.split('/')[0]
    const fileName = uuid4() + '.' + title

    const stream = createReadStream();

    const filePath = path.join(__dirname, `../../public/${fileType}`)
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, {recursive: true})
    }

    const out = fs.createWriteStream(path.resolve(filePath, fileName))
    await stream.pipe(out);

    return {
        filepath: `${fileType}/${fileName}`,
        filename: fileName
    }
}

module.exports = {
    Upload: GraphQLUpload,
    Mutation: {
        singleUpload: async (parent, {file}) => {
            try {
                const {createReadStream, filename: title, mimetype, encoding} = await file
                const {filename, filepath} = await writeFileToPublic(createReadStream, title, mimetype)
                return {ok: true, path: {filename, filepath, mimetype}}

            } catch (error) {
                console.log(error)
                return {
                    ok: false,
                    errors: [{path: 'singe upload', message: `Something went wrong: ${error}`}],
                }
            }
        }
        ,
        multipleUpload: async (parent, {files}) => {
            try {
                const data = await Promise.all(files.map(async upload => {
                        const {filename: title, mimetype, encoding, createReadStream} = await upload
                        const {filename, filepath} = await writeFileToPublic(createReadStream, title, mimetype)
                        return {filename, filepath, mimetype}
                    })
                )
                return {ok: true, path: data}
            } catch (error) {
                console.log(error)
                return {
                    ok: false,
                    errors: [{path: 'multiple upload', message: `Something went wrong: ${error}`}],
                }
            }
        }
    },

}
