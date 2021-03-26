import got from 'got';
import metascraper from 'metascraper';
import metascraperLogoFavicon from 'metascraper-logo-favicon';
import crypto from 'crypto';
import request from 'request';
import fs from 'fs';
import constants from '@/constants';

const promisifyStream = (stream: fs.WriteStream) => {
    return new Promise((resolve, reject) => {
        stream.on('end', () => {
            resolve('end');
        });
        stream.on('finish', () => {
            resolve('finish');
        });
        stream.on('error', (error) => {
            reject(error);
        });
    });
};

const getExtension = (path: string) => {
    const index = path.lastIndexOf('.');

    return index < 0 ? '' : path.substr(index).split(/[?#]/)[0];
};

export default async (url: string): Promise<string> => {
    try {
        const {body: html, url: gotUrl} = await got(url, {
            https: {
                rejectUnauthorized: false,
            },
        });
        const metadata = ((await metascraper([metascraperLogoFavicon()])({
            html,
            url: gotUrl,
        })) as unknown) as {logo: string};

        if (metadata.logo) {
            const returnUrl =
                crypto
                    .createHmac('sha256', process.env.SECRET ?? '')
                    .update(metadata.logo)
                    .digest('hex') + getExtension(metadata.logo);
            const stream = fs.createWriteStream(
                `./${constants.faviconsFolder}/${returnUrl}`,
            );

            request(metadata.logo, {
                rejectUnauthorized: false,
            }).pipe(stream);
            await promisifyStream(stream);

            return returnUrl;
        }

        return '';
    } catch (error) {
        console.log('Could not fetch favicon for ' + url);
        console.log(error);
    }

    return '';
};
