module.exports = {
    skincares: async (parent, args, { models }) => {
        return await models.Skincare.find().limit(100);
    },
    skincare: async (parent, args, {models}) => {
        return await models.Skincare.findById(args.id);
    },
    user: async (parent, { username }, { models}) => {
        return await models.User.findOne({ username});
    },
    users: async (parent, args, { models}) => {
        return await models.User.find({});
    },
    me: async (parent, args, { models, user}) => {
        return await models.User.findById(user.id);
    },
    skincareFeed: async (parent, { cursor }, { models}) => {
        const limit = 10;
        let hasNextPage = false;

        let cursorQuery = {};

        if(cursor) {
            cursorQuery = { _id: {$lt: cursor} };
        }

        let skincares = await models.Skincare.find(cursorQuery)
        .sort({_id: -1})
        .limit(limit +1);

        if(skincares.length > 1){
            hasNextPage = true;
            skincares = skincares.slice(0, -1);
        }

        const newCursor = skincares[skincares.length - 1]._id;
        return {
            skincares,
            cursor: newCursor,
            hasNextPage
        };
    }
};