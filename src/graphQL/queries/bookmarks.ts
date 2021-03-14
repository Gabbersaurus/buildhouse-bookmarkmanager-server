import ConnectionContainer from '@/ConnectionContainer';
import Context from '@/Context';
import Bookmark from '@/entities/Bookmark';

export default async (
    _: any,
    args: Record<string, never>,
    context: Context,
): Promise<Bookmark[]> => {
    context.requireLogin();

    return await ConnectionContainer.connection.getRepository(Bookmark).find({
        where: {user: {id: context.user?.id}},
        order: {
            order: 'ASC',
        },
    });
};
