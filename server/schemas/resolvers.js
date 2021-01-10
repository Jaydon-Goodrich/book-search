const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find()
                .select('-__v')
        },
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')

                return userData;
            }

            throw new AuthenticationError('Not logged in')
        }
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user }
        },

        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        saveBook: async (parent, args, context) => {
            if (context.user) {
                const updatedUserBook = await Book.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: book._id } },
                    { new: true }
                ).populate('books');
                return updatedUserBook;
            }
            throw new AuthenticationError("Not Logged in");
        },

        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const removedBook = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: bookId } },
                    { new: true }
                ).populate('books');

                return removedBook;
            }

            throw new AuthenticationError('You need to be logged in!');
        }

    }
};

module.exports = resolvers;