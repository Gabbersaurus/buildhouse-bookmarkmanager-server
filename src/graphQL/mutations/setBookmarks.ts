import ConnectionContainer from '@/ConnectionContainer';
import Context from '@/Context';
import BookmarkInput from '@/types/BookmarkInput';
import Bookmark from '@/entities/Bookmark';
import User from '@/entities/User';
import {In, Not} from 'typeorm';
import getFavicon from '@/helpers/getFavicon';

export default async (
    _: any,
    args: {bookmarks: BookmarkInput[]},
    context: Context,
): Promise<boolean> => {
    context.requireLogin();

    const toKeep: number[] = [];
    const toSave: Bookmark[] = [];

    for (const bookmark of args.bookmarks) {
        if (bookmark.id >= 0) {
            //If id is given, update
            const bookmarkToUpdate = await ConnectionContainer.connection
                .getRepository(Bookmark)
                .findOne(bookmark.id, {relations: ['user']});

            if (
                bookmarkToUpdate &&
                bookmarkToUpdate?.user.id == context.user?.id
            ) {
                if (bookmarkToUpdate.url != bookmark.url) {
                    bookmarkToUpdate.favicon = await getFavicon(bookmark.url);
                }

                bookmarkToUpdate.name = bookmark.name;
                bookmarkToUpdate.url = bookmark.url;
                bookmarkToUpdate.order = bookmark.order;

                toSave.push(bookmarkToUpdate);
                toKeep.push(bookmarkToUpdate.id);
            }
        } else {
            //If ID not given, create new
            toSave.push(
                new Bookmark(
                    bookmark.name,
                    bookmark.url,
                    await getFavicon(bookmark.url),
                    bookmark.order,
                    context.user as User,
                ),
            );
        }
    }

    //Delete any that were not updated
    const toDelete: number[] = (
        await ConnectionContainer.connection.getRepository(Bookmark).find({
            where: {
                id: Not(In(toKeep)),
                user: {
                    id: context.user?.id,
                },
            },
        })
    ).map((bookmark) => {
        return bookmark.id;
    });

    if (toDelete.length > 0) {
        await ConnectionContainer.connection
            .getRepository(Bookmark)
            .delete(toDelete);
    }

    //Save new and updated
    await ConnectionContainer.connection.getRepository(Bookmark).save(toSave);

    return true;
};
