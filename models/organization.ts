export class Organization {
    name: string;
    code: string;
    email: string;
    password: string;

    constructor(name: string, code: string, email: string, password: string) {
        this.name = name;
        this.code = code;
        this.email = email;
        this.password = password;
    }
}