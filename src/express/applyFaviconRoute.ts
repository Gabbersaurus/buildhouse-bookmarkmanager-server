import constants from '@/constants';
import {verify} from '@/helpers/jwt';
import {Express} from 'express';
import path from 'path';
import fs from 'fs';

export default (app: Express): void => {
    app.get('/favicon/:favicon', async function (req, res) {
        try {
            if (!req.params.favicon || !req.query.token) {
                throw new Error('Invalid parameters');
            }

            let file = '';

            try {
                file = verify<string>(req.query.token as string);
            } catch {
                throw new Error('Invalid token');
            }

            if (!file || req.params.favicon !== file) {
                throw new Error('Token does not match favicon');
            }

            const faviconPath = path.join(
                path.resolve(
                    `${__dirname}${path.sep}..${path.sep}..${path.sep}`,
                ),
                `${constants.faviconsFolder}${path.sep}${file}`,
            );

            try {
                await fs.promises.stat(faviconPath);
            } catch {
                throw new Error('File not found');
            }

            res.sendFile(faviconPath, function (err) {
                if (err) {
                    res.status(500).end();
                }
            });
        } catch (err) {
            res.status(500).send({error: err.message});
        }
    });
};
