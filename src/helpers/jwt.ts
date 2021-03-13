import jsonwebtoken from 'jsonwebtoken';

const sign = (id: number | undefined): string => {
    if (id == undefined) {
        throw new Error('Invalid user ID');
    }

    return jsonwebtoken.sign(
        {
            exp:
                Math.floor(Date.now() / 1000) +
                parseInt(process.env.JWTEXPIRE ?? '86400'),
            data: id,
        },
        process.env.SECRET ?? '',
    );
};

const verify = (token: string): number => {
    return (jsonwebtoken.verify(token, process.env.SECRET ?? '') as {
        data: number;
    }).data;
};

export {sign, verify};
