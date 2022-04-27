const Query = require('./query');
const Mutation = require('./mutation');
const Skincare = require('./skincare');
const User = require('./user');
const { GraphQLDateTime } = require('graphql-iso-date');
module.exports = {
    Query,
    Mutation,
    Skincare,
    User, 
    DateTime: GraphQLDateTime
};