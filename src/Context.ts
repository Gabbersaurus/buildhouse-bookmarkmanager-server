export default class Context {
    private _userId: number | null = null;

    constructor(userId: number | null = null) {
        this._userId = userId;
    }

    get userId(): number | null {
        return this._userId;
    }
}
