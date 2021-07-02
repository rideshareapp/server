/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace Express {
    export interface Request {
        user: any;
    }
    export interface Response {
        user: any;
    }
}

interface coordinates {
    "x": number,
    "y": number
}

interface eventRequest {
    code: string;
    name: string;
    date: Date;
    include_time: boolean;
}
