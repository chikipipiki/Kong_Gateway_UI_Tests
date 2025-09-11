import { faker } from "@faker-js/faker";

//oversimplified version, can be implemented the same way as Services
export class RouteModel {
    name: string;
    methods: string[];
    host: string;
    path: string;

    constructor(host: string) {
        this.name = faker.word.verb();
        this.methods = ["GET", "POST", "DELETE"];
        this.host = host;
        this.path = `/api/v1/${this.name}`;
    }
}
