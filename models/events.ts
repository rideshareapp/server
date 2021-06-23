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

export class EventNoCode {
    id: number;
    event_name: string;
    event_date: Date;
    include_time: boolean;

    constructor(id: number, event_name: string, event_date: Date, include_time: boolean) {
        this.id = id;
        this.event_name = event_name;
        this.event_date = event_date;
        this.include_time = include_time;
    }
}