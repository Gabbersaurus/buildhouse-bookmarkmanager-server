import jsonwebtoken from 'jsonwebtoken';

const sign = <T>(toSign: T, expiresIn: number): string => {
    return jsonwebtoken.sign(
        {
            data: toSign,
        },
        process.env.SECRET ?? '',
        {expiresIn},
    );
};

const signID = (id: number | undefined): string => {
    if (id == undefined) {
        throw new Error('Invalid user ID');
    }

    return sign<number>(id, parseInt(process.env.JWTEXPIRE ?? '86400'));
};

const verify = <T>(token: string): T => {
    return (jsonwebtoken.verify(token, process.env.SECRET ?? '') as {
        data: T;
    }).data;
};

export {signID, sign, verify};
