import {signID} from '@/helpers/jwt';
import Authentication from '@/types/Authentication';
import Context from '@/Context';

export default async (
    _: any,
    args: Record<string, never>,
    context: Context,
): Promise<Authentication> => {
    context.requireLogin();

    const token = signID(context.user?.id);

    return {
        token,
    };
};
