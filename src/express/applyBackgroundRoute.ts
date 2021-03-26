import {Express} from 'express';
import constants from '@/constants';
import path from 'path';

export default (app: Express): void => {
    app.get('/background', function (req, res) {
        const backgrounds = process.env.BACKGROUNDS?.split(',') || [];

        if (backgrounds.length <= 0) {
            throw new Error('No backgrounds specified');
        }

        const timestamp = Date.now();
        const refreshDays = parseInt(process.env.REFRESHDAYS || '1');
        const index =
            Math.floor(timestamp / (refreshDays * 86400)) % backgrounds.length;

        if (backgrounds[index].length <= 0) {
            throw new Error('Invalid background in env');
        }

        res.sendFile(
            path.join(
                path.resolve(
                    `${__dirname}${path.sep}..${path.sep}..${path.sep}`,
                ),
                `${constants.backgroundsFolder}${path.sep}${backgrounds[
                    index
                ].trim()}`,
            ),
            function (err) {
                if (err) {
                    res.status(500).send({error: 'File not found'});
                }
            },
        );
    });
};
