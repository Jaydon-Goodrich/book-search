import gql from 'graphql-tag';

//A Query to pull all the data for the user
export const GET_ME = gql`
    {
        me{
            _id
            username
            email
            bookCount
            savedBooks{
                authors
                title
                bookId
                description
                image
                link
            }
        }
    }
`;
