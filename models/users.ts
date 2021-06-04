export class User {
    first: string;
    last: string;
    phone: string;
    email: string;
    password: string;

    constructor(first: string, last: string, phone: string, email: string, password: string) {
        this.first = first;
        this.last = last;
        this.phone = phone;
        this.email = email;
        this.password = password;
    }
}