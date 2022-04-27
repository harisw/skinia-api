module.exports = {
    // Resolve the list of skincares for a user when requested
    skincares: async (user, args, { models }) => {
    return await models.Skincare.find({ author: user._id }).sort({ _id: -1 });
    },
    // Resolve the list of favorites for a user when requested
    favorites: async (user, args, { models }) => {
    return await models.Skincare.find({ favoritedBy: user._id }).sort({ _id: -1 });
    }
    };