export class ApplicationException extends Error {
    constructor(message = 'An error has occurred') {
        super(message);
    }
}