import got from 'got';
import metascraper from 'metascraper';
import metascraperLogoFavicon from 'metascraper-logo-favicon';

export default async (url: string): Promise<string> => {
    try {
        const {body: html, url: gotUrl} = await got(url);
        const metadata = ((await metascraper([metascraperLogoFavicon()])({
            html,
            url: gotUrl,
        })) as unknown) as {logo: string};

        return metadata.logo || '';
    } catch (error) {
        console.log('Could not fetch favicon for ' + url);
        console.log(error);
    }

    return '';
};
