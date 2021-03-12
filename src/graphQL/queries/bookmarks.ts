import Context from '@/context';
import Bookmark from '@/types/Bookmark';

export default (
    _: any,
    args: Record<string, never>,
    context: Context,
): Bookmark[] => [
    {
        id: context.userId ?? 1515,
        name: 'test',
        url: 'test',
        order: 0,
    },
];
