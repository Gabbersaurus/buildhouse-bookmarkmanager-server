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

    type Authentication {
        token: String!
    }

    type Mutation {
        authenticate(username: String!, password: String!): Authentication
    }
`;

export default typeDefs;
