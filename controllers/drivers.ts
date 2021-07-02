// Controllers: Drivers

import * as db from "../db/utils";
import { Success, Error } from "../models/return_status";
import { Request, Response } from "express";

export async function newDriver(req: Request, res: Response): Promise<Response> {
    try {
        if (await db.getOrgCode(req.user.email) !== req.body.code) {
            return res.status(403);
        }
        await db.newDriver(req.body.email, req.body.code);
        return res.status(201).json(new Success("driver added"));
    } catch (err) {
        console.error(err);
        return res.status(500).json(new Error("internal server error"));
    }
}
