const path = require('path');
const {loadFilesSync} = require('@graphql-tools/load-files');
const {mergeResolvers} = require('@graphql-tools/merge');


const typesArray = loadFilesSync(path.join(__dirname, './Resolvers'));
module.exports = mergeResolvers(typesArray);






