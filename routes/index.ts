import { Application } from "express";
import { router as users } from "./users"

export default function(app: Application): void {
    app.use('/users', users);
}