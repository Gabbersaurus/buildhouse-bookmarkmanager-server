import ConnectionContainer from '@/ConnectionContainer';
import Context from '@/Context';
import Bookmark from '@/entities/Bookmark';

export default async (
    _: any,
    args: {bookmarks: {id: number; order: number}[]},
    context: Context,
): Promise<boolean> => {
    context.requireLogin();

    const toUpdate: Bookmark[] = [];

    for (const bookmarkOrderObject of args.bookmarks) {
        const bookmark = await ConnectionContainer.connection
            .getRepository(Bookmark)
            .findOne(bookmarkOrderObject.id, {relations: ['user']});

        if (bookmark && bookmark?.user.id == context.user?.id) {
            bookmark.order = bookmarkOrderObject.order;

            toUpdate.push(bookmark);
        }
    }

    await ConnectionContainer.connection.getRepository(Bookmark).save(toUpdate);

    return true;
};
