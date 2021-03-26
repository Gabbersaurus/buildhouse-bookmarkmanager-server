import ConnectionContainer from '@/ConnectionContainer';
import Context from '@/Context';
import BookmarkInput from '@/types/BookmarkInput';
import Bookmark from '@/entities/Bookmark';
import getFavicon from '@/helpers/getFavicon';

export default async (
    _: any,
    args: {bookmarks: BookmarkInput[]},
    context: Context,
): Promise<boolean> => {
    context.requireLogin();

    const bookmarks = await ConnectionContainer.connection
        .getRepository(Bookmark)
        .find({
            where: {user: {id: context.user?.id}},
        });

    for (const bookmark of bookmarks) {
        bookmark.favicon = await getFavicon(bookmark.url);
    }

    await ConnectionContainer.connection
        .getRepository(Bookmark)
        .save(bookmarks);

    return true;
};
