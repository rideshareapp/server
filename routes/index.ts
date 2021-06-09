import { Application } from "express";
import { router as users } from "./users";
import { router as organizations } from "./organizations";

export default function(app: Application): void {
    app.use('/users', users);
    app.use('/organizations', organizations);
}