module.exports = {
    // Resolve the author info for a skincare when requested
    author: async (skincare, args, { models }) => {
    return await models.User.findById(skincare.author);
    },
    // Resolved the favoritedBy info for a skincare when requested
    favoritedBy: async (skincare, args, { models }) => {
    return await models.User.find({ _id: { $in: skincare.favoritedBy } });
    }
};