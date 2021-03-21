import {gql} from 'apollo-server';

const typeDefs = gql`
    type Bookmark {
        id: Int
        name: String
        url: String
        favicon: String
        order: Int
    }

    type Authentication {
        token: String
    }

    type Query {
        bookmarks: [Bookmark]
        authentication: Authentication
    }

    input BookmarkInput {
        id: Int
        name: String
        url: String
        order: Int
    }

    type Mutation {
        authenticate(username: String!, password: String!): Authentication
        setBookmarks(bookmarks: [BookmarkInput]!): Boolean
        resetFavicons: Boolean
    }
`;

export default typeDefs;
