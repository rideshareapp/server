import { User } from "./users";

export class Trip {
    id: string;
    driver: string;
    passengers: Array<User>;

    constructor(id: string, driver: string, passengers: Array<User>) {
        this.id = id;
        this.driver = driver;
        this.passengers = passengers;
    }
}