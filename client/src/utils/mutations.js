import gql from 'graphql-tag';

//Mutation logic for loging in the user
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password){
            token
            user{
                _id
                username
            }
        }
    }
`;
// mutation defenition for adding a user
export const ADD_USER = gql`
    mutation addUser($email: String!, $password: String!, $username: String!){
        addUser(email: $email, password: $password, username: $username){
            token
            user{
                username
                email
            }
        }
    }
`;
//mutation def for saving a book
export const SAVE_BOOK = gql`
    mutation saveBook($book: BookInput!) {
    saveBook(book: $book) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        title
        authors
        description
        image
        link
      }
    }
  }
`;
//mutation for removing a book
export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
        removeBook(bookId: $bookId) {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                title
                authors
                description
                image
                link
            }
        }
    }
`;