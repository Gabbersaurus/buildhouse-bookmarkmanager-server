import ConnectionContainer from '@/ConnectionContainer';
import Context from '@/Context';
import Bookmark from '@/entities/Bookmark';

export default async (
    _: any,
    args: {id: number},
    context: Context,
): Promise<boolean> => {
    context.requireLogin();

    const bookmark = await ConnectionContainer.connection
        .getRepository(Bookmark)
        .findOne(args.id, {relations: ['user']});

    if (!bookmark) {
        throw new Error('Bookmark not found');
    }

    if (bookmark?.user.id != context.user?.id) {
        throw new Error(
            'You do not have the permission to delete this bookmark',
        );
    }

    await ConnectionContainer.connection
        .getRepository(Bookmark)
        .remove(bookmark);

    return true;
};
