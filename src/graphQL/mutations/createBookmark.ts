import ConnectionContainer from '@/ConnectionContainer';
import Context from '@/Context';
import Bookmark from '@/entities/Bookmark';

export default async (
    _: any,
    args: {name: string; url: string; order: number},
    context: Context,
): Promise<boolean> => {
    context.requireLogin();

    if (context.user) {
        await ConnectionContainer.connection
            .getRepository(Bookmark)
            .save(new Bookmark(args.name, args.url, args.order, context.user));
    }

    return true;
};
