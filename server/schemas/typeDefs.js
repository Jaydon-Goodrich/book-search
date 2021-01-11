const { gql } = require('apollo-server-express');

//Create various types for the data
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }
    # Create what kind of Query we want
    type Query {
        me: User
        users: [User]
    }
    # For authenticating the user
    type Auth {
        token: ID!
        user: User
    }
    # Book input used to pass params to the savebook mutation
    input BookInput {
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }
    # Define the mutations
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, password: String!, email: String!): Auth
        saveBook(book: BookInput!): User
        removeBook(bookId: String!): User
    }
`;


module.exports = typeDefs;