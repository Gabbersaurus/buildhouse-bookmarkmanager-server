import ConnectionContainer from '@/ConnectionContainer';
import Context from '@/Context';
import Bookmark from '@/entities/Bookmark';
import {sign} from '@/helpers/jwt';
import constants from '@/constants';

export default async (
    _: any,
    args: Record<string, never>,
    context: Context,
): Promise<Bookmark[]> => {
    context.requireLogin();

    const bookmarks = await ConnectionContainer.connection
        .getRepository(Bookmark)
        .find({
            where: {user: {id: context.user?.id}},
            order: {
                order: 'ASC',
            },
        });

    for (const bookmark of bookmarks) {
        if (bookmark.favicon) {
            bookmark.favicon = `${bookmark.favicon}?${
                constants.faviconTokenQuery
            }=${sign<string>(
                bookmark.favicon,
                parseInt(process.env.FAVICONEXPIRE ?? '30'),
            )}`;
        }
    }

    return bookmarks;
};
