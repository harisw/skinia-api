// index.js
// This is the main entry point of our application
const { ApolloServer, gql } = require('apollo-server-express');
require('dotenv').config();
const db = require('./db');
const models = require('./models');
const port = process.env.PORT || 8080;
const DB_HOST = process.env.DB_HOST;
const express = require('express');
const app = express();
const typeDefs = require('./schema');
const jwt = require('jsonwebtoken');
const resolvers = require('./resolvers');
const helmet = require('helmet');
const cors = require('cors');
const depthLimit = require('graphql-depth-limit');
const { createComplexityLimitRule } = require('graphql-validation-complexity');

db.connect(DB_HOST);
const getUser = token => {
    if(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            throw new Error('Session invalid');
        }
    }
};


app.use(helmet());
app.use(cors());

const server = new ApolloServer( {
    typeDefs,
    resolvers,
    validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
    context: async ({req}) => {
        const token = req.headers.authorization;
        const user = await getUser(token);

        return { models, user };
    },
    introspection: true,
    playground: true
});
server.applyMiddleware({ app, path: '/api' });

app.get('/', (req, res) => res.send('Hello world'));

app.listen({ port }, () => 
    console.log(`GraphQL server running at http://localhost:${port}${server.graphqlPath}!`)
);
