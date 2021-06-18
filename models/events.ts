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
    event_name: string;
    event_date: Date;
    include_time: boolean;

    constructor(event_name: string, event_date: Date, include_time: boolean) {
        this.event_name = event_name;
        this.event_date = event_date;
        this.include_time = include_time;
    }
}