import bookmarks from './queries/bookmarks';
import authenticate from './mutations/authenticate';
import authentication from './queries/authentication';
import setBookmarks from './mutations/setBookmarks';

export default {
    Query: {
        bookmarks,
        authentication,
    },
    Mutation: {
        authenticate,
        setBookmarks,
    },
};
