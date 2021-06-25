import { Application } from "express";
import { router as users } from "./users";
import { router as organizations } from "./organizations";
import { router as events } from "./events";
import { router as drivers } from "./drivers";
import { router as trips } from "./trips";

export default function(app: Application): void {
    app.use('/users', users);
    app.use('/organizations', organizations);
    app.use('/events', events);
    app.use('/drivers', drivers);
    app.use('/trips', trips);
}