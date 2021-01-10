const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        _id: ID!
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type Query {
        me: User
        users: [User]
    }

    type Auth {
        token: ID!
        user: User
    }

    input BookInput {
        _id: ID!
        authors: [String]
        description: String
        title: String
        bookId: String
        image: String
        link: String
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, password: String!, email: String!): Auth
        saveBook(input: BookInput): User
        removeBook(bookId: String): User
    }
`;


module.exports = typeDefs;