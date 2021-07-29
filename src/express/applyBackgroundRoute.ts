import {Express} from 'express';
import constants from '@/constants';
import path from 'path';
import fs from 'fs';

export default (app: Express): void => {
    app.get('/background', async function (req, res) {
        try {
            const backgroundsFolder = path.resolve(
                `${__dirname}${path.sep}..${path.sep}..${path.sep}${constants.backgroundsFolder}`,
            );

            const backgrounds = await fs.promises.readdir(backgroundsFolder);

            if (backgrounds.length <= 0) {
                throw new Error('No backgrounds specified');
            }

            const timestamp = Date.now();
            const refreshDays = parseInt(
                process.env.BACKGROUNDREFRESHDAYS || '1',
            );
            const index =
                Math.floor(timestamp / (refreshDays * 86400)) %
                backgrounds.length;

            res.sendFile(
                path.join(backgroundsFolder, backgrounds[index]),
                {
                    maxAge: `${refreshDays} days`,
                },
                function (err) {
                    if (err) {
                        res.status(500).end();
                    }
                },
            );
        } catch (err) {
            res.status(500).send({error: err.message});
        }
    });
};
