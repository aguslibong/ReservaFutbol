// errors.js
export class ResourceNotFound extends Error {
    constructor(message) {
        super(message);
        this.name = 'ResourceNotFound';
        this.status = 404;
    }
}

export class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
        this.status = 400;
    }
}
