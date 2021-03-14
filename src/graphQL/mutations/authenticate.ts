import ConnectionContainer from '@/ConnectionContainer';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import Authentication from '@/types/Authentication';
import User from '@/entities/User';
import {AuthenticationError} from 'apollo-server';
import {sign} from '@/helpers/jwt';

export default async (
    _: any,
    args: {username: string; password: string},
): Promise<Authentication> => {
    const user = await ConnectionContainer.connection
        .getRepository(User)
        .findOne({
            where: {
                username: args.username,
            },
        });

    if (
        user == undefined ||
        !(await bcrypt.compare(args.password, user?.password))
    ) {
        throw new AuthenticationError('Username or password invalid');
    }

    return {
        token: sign(user.id),
    };
};
