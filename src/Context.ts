import {AuthenticationError} from 'apollo-server';
import User from './entities/User';
import ConnectionContainer from './ConnectionContainer';
import {verify} from '@/helpers/jwt';

export default class Context {
    private _user: User | undefined = undefined;

    private constructor(user: User | undefined = undefined) {
        this._user = user;
    }

    public static async create(token: string): Promise<Context> {
        token = token.replace('Bearer ', '');

        let user: User | undefined = undefined;

        if (token.length) {
            try {
                const id = verify<number>(token);

                user = await ConnectionContainer.connection
                    .getRepository(User)
                    .findOne({
                        where: {
                            id,
                        },
                    });
            } catch {
                user = undefined; //Token invalid or expired - set to undefined just in case
            }
        }

        return new Context(user);
    }

    get user(): User | undefined {
        return this._user;
    }

    public requireLogin(): void {
        if (!this._user) {
            throw new AuthenticationError('User is not logged in');
        }
    }
}
