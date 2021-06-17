import { Application } from "express";
import { router as users } from "./users";
import { router as organizations } from "./organizations";
import { router as events } from "./events";

export default function(app: Application): void {
    app.use('/users', users);
    app.use('/organizations', organizations);
    app.use('/events', events);
}