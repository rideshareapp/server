export class Success {
    status: string;
    details: unknown;

    constructor(details: unknown) {
        this.status = "success";
        this.details = details;
    }
}

export class Error {
    status: string;
    details: unknown;

    constructor(message: unknown) {
        this.status = "error";
        this.details = {
            "error": message
        };
    }
}