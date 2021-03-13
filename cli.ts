import bcrypt from 'bcrypt';
import User from '@/entities/User';
import constants from '@/constants';
import {createConnection} from 'typeorm';
import Bookmark from '@/entities/Bookmark';

const createUser = async (args: string[]): Promise<void> => {
    if (args.length < 2) {
        console.error('Command structure: `create-user {username} {password}');
        return;
    }

    const username = args[0];
    const connection = await createConnection();

    if (await connection.getRepository(User).findOne({where: {username}})) {
        console.error('User already exists');
        return;
    }

    const password = await bcrypt.hash(args[1], constants.saltRounds);

    await connection.getRepository(User).save(new User(username, password));

    console.log('Added user');
};

const testAddBookmarks = async (args: string[]): Promise<void> => {
    const username = args[0];
    const connection = await createConnection();

    const user = await connection
        .getRepository(User)
        .findOne({where: {username}});

    if (user) {
        await connection
            .getRepository(Bookmark)
            .save([
                new Bookmark('test1', 'test1', 0, user),
                new Bookmark('test2', 'test2', 1, user),
                new Bookmark('test3', 'test3', 2, user),
                new Bookmark('test4', 'test4', 3, user),
            ]);
    }

    console.log('Added bookmarks');
};

const cli = async (args: string[]): Promise<void> => {
    console.log('Buildhouse bookmarkmanager CLI');

    if (args.length < 1) {
        console.error('Please enter a command');
        return;
    }

    const command = args.shift();

    switch (command) {
        case 'create-user':
            return await createUser(args);
        case 'test':
            return await testAddBookmarks(args);
        default:
            console.error('Command not found');
    }
};

void cli(process.argv.slice(2));
