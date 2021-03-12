import {gql} from 'apollo-server';

const typeDefs = gql`
    type Bookmark {
        id: Int
        name: String
        url: String
        order: Int
    }

    type Query {
        bookmarks: [Bookmark]
    }
`;

export default typeDefs;
