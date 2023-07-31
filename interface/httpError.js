class HttpError extends Error {
    constructor(message, code, status) {
        super(message);
        this.code = code;
        this.status = status;
    }
}

module.exports = HttpError;