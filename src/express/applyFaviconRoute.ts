import constants from '@/constants';
import {verify} from '@/helpers/jwt';
import {Express} from 'express';
import path from 'path';

export default (app: Express): void => {
    app.get('/favicon/:favicon', function (req, res) {
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

        res.sendFile(
            path.join(
                path.resolve(
                    `${__dirname}${path.sep}..${path.sep}..${path.sep}`,
                ),
                `${constants.faviconsFolder}${path.sep}${file}`,
            ),
            function (err) {
                if (err) {
                    res.status(500).send({error: 'File not found'});
                }
            },
        );
    });
};
