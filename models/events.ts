export class Event {
    id: string;
    name: string;
    date: Date;


    constructor(id: string, name: string, date: Date) {
        this.id = id;
        this.name = name;
        this.date = date;
    }
}