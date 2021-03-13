import {sign} from '@/helpers/jwt';
import Authentication from '@/types/Authentication';
import Context from '@/Context';

export default async (
    _: any,
    args: Record<string, never>,
    context: Context,
): Promise<Authentication> => {
    context.requireLogin();

    const token = sign(context.user?.id);

    return {
        token,
    };
};
