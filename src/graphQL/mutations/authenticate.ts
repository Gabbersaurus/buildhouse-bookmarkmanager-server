import ConnectionContainer from '@/ConnectionContainer';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import Authentication from '@/types/Authentication';
import User from '@/entities/User';
import {AuthenticationError} from 'apollo-server';

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

    const token = jsonwebtoken.sign(
        {
            exp:
                Math.floor(Date.now() / 1000) +
                parseInt(process.env.JWTEXPIRE ?? '86400'),
            data: user.id,
        },
        process.env.SECRET ?? '',
    );

    return {
        token,
    };
};
