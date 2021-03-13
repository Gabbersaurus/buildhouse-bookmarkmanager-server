import bookmarks from './queries/bookmarks';
import authenticate from './mutations/authenticate';

export default {
    Query: {
        bookmarks,
    },
    Mutation: {
        authenticate,
    },
};
