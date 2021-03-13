import bcrypt from 'bcrypt';
import User from '@/entities/User';
import constants from '@/constants';
import {createConnection} from 'typeorm';
import crypto from 'crypto';
import base64url from 'base64url';

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

const deleteUser = async (args: string[]): Promise<void> => {
    if (args.length < 1) {
        console.error('Command structure: `delete-user {username}');
        return;
    }

    const username = args[0];
    const connection = await createConnection();
    const user = await connection
        .getRepository(User)
        .findOne({where: {username}});

    if (!user) {
        console.error('User does not exist');
        return;
    }

    await connection.getRepository(User).remove(user);

    console.log('Removed user');
};

const generateSecret = async (args: string[]): Promise<void> => {
    let length = 48;

    if (args.length > 0) {
        length = parseInt(args[0]);
    }

    console.log(base64url(crypto.randomBytes(length)));
    console.log('You have to manually set it in the .env file!');
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
        case 'delete-user':
            return await deleteUser(args);
        case 'generate-secret':
            return await generateSecret(args);
        default:
            console.error('Command not found');
    }
};

void cli(process.argv.slice(2));
