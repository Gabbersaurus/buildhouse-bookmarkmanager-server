import {gql} from 'apollo-server';

const typeDefs = gql`
    type Bookmark {
        id: Int
        name: String
        url: String
        order: Int
    }

    type Authentication {
        token: String
    }

    input BookmarkOrder {
        id: Int!
        order: Int!
    }

    type Query {
        bookmarks: [Bookmark]
        authentication: Authentication
    }

    type Mutation {
        authenticate(username: String!, password: String!): Authentication
        createBookmark(name: String!, url: String!, order: Int!): Boolean
        updateBookmark(id: Int!, name: String!, url: String!): Boolean
        deleteBookmark(id: Int!): Boolean
        updateBookmarksOrder(bookmarks: [BookmarkOrder]!): Boolean
    }
`;

export default typeDefs;
