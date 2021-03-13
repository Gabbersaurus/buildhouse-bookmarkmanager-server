import ConnectionContainer from '@/ConnectionContainer';
import Context from '@/context';
import Bookmark from '@/entities/Bookmark';

export default async (
    _: any,
    args: Record<string, never>,
    context: Context,
): Promise<Bookmark[]> => {
    context.requireLogin();

    return await ConnectionContainer.connection.getRepository(Bookmark).find({
        where: {user: {id: context.user?.id}},
    });
};
