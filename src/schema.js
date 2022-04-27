const { gql } = require('apollo-server-express');

module.exports = gql`
    scalar DateTime

    type Skincare {
        id: ID!
        name: String!
        url: String
        price: Float
        ingreds: String
        type: String
        author: User
        favoriteCount: Int
        favoritedBy: [User]
        createdAt: DateTime
        updatedAt: DateTime
    }
    type User {
        id: ID!
        username: String!
        email: String!
        avatar: String
        skincares: [Skincare!]!
        favorites: [Skincare!]!
    }
    type SkincareFeed {
        skincares: [Skincare]!
        cursor: String!
        hasNextPage: Boolean!
    }
    type Query {
        skincares: [Skincare]
        skincare(id: ID!): Skincare!
        user(username: String!): User
        users: [User!]!
        me: User!
        skincareFeed(cursor: String): SkincareFeed
    }
    type Mutation {
        signUp(username: String!, email: String!, password: String!): String!
        signIn(username: String, email: String, password: String!): String!
        toggleFavorite(id: ID!): Skincare!
    }
`;