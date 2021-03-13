import bookmarks from './queries/bookmarks';
import authenticate from './mutations/authenticate';
import authentication from './queries/authentication';
import createBookmark from './mutations/createBookmark';
import deleteBookmark from './mutations/deleteBookmark';
import updateBookmark from './mutations/updateBookmark';
import updateBookmarksOrder from './mutations/updateBookmarksOrder';

export default {
    Query: {
        bookmarks,
        authentication,
    },
    Mutation: {
        authenticate,
        createBookmark,
        updateBookmark,
        deleteBookmark,
        updateBookmarksOrder,
    },
};
