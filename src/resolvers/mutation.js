const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    AuthenticationError,
    ForbiddenError
} = require('apollo-server-express');
require('dotenv').config();
const gravatar = require('../util/gravatar');
const mongoose = require('mongoose');

module.exports = {
    signUp: async (parent, {username, email, password}, { models}) => {
        email = email.trim().toLowerCase();
        const hashed = await bcrypt.hash(password, 10);
        const avatar = gravatar(email);
        try {
            const user = await models.User.create({
                username,
                email,
                avatar,
                password: hashed
            });
            return jwt.sign({ id: user._id}, process.env.JWT_SECRET);
        } catch (err) {
            console.log(err);
            throw new Error('Error creating account');
        }
    },
    signIn: async (parent, {username, email, password}, { models}) => {
        if(email) {
            email = email.trim().toLowerCase();
        }
        const user = await models.User.findOne({
            $or: [{ email}, {username}]
        });

        if(!user){
            throw new AuthenticationError('Error signing in');
        }

        const valid = await bcrypt.compare(password, user.password);
        if(!valid){
            throw new AuthenticationError('Error signing in');
        }
        return jwt.sign({ id: user._id}, process.env.JWT_SECRET);
    },
    toggleFavorite: async (parent, { id }, {models, user}) => {
        if(!user){
            throw new AuthenticationError();
        }
        let skincareCheck = await models.Skincare.findById(id);
        const hasUser = skincareCheck.favoritedBy.indexOf(user.id);

        if(hasUser >= 0) {
            return await models.Skincare.findByIdAndUpdate(
                id,
                {
                    $pull: {
                        favoritedBy: mongoose.Types.ObjectId(user.id)
                    },
                    $inc: {
                        favoriteCount: -1
                    }
                },
                {
                    new: true
                }
            );
        } else {
            return await models.Skincare.findByIdAndUpdate(
                id,
                {
                    $push: {
                        favoritedBy: mongoose.Types.ObjectId(user.id)
                    },
                    $inc: {
                        favoriteCount: 1
                    }
                },
                {
                    new: true
                }
            )
        }
    }
};