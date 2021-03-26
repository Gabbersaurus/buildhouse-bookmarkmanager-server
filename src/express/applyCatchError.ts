import {Express, NextFunction, Request, Response} from 'express';

export default (app: Express): void => {
    app.use(
        // Have to disable the unused var. Without it, express won't use this to catch errors.
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (err: Error, req: Request, res: Response, next: NextFunction): void => {
            res.status(500).send({error: err.message});
        },
    );
};
