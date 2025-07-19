class GitMateError extends Error {
    constructor(status, message) {
        super(message);
        this.name = "GitMateError"
        this.status = status;
    }
}

module.exports = GitMateError
