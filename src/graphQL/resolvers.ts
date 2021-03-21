import bookmarks from './queries/bookmarks';
import authenticate from './mutations/authenticate';
import authentication from './queries/authentication';
import setBookmarks from './mutations/setBookmarks';
import resetFavicons from './mutations/resetFavicons';

export default {
    Query: {
        bookmarks,
        authentication,
    },
    Mutation: {
        authenticate,
        setBookmarks,
        resetFavicons,
    },
};
