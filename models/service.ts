import { faker } from "@faker-js/faker";

interface ServiceBase {
    name: string;
    tags: string[];
    read_timeout: number;
    connect_timeout: number;
    write_timeout: number;
    retries: number;
    port: number;

    //check what are those
    ca_certificates: null;
    client_certificate: null;
}

export class ServiceModel implements ServiceBase {
    name: string;
    url: string;
    tags: string[];
    read_timeout: number = 60000;
    connect_timeout: number = 60000;
    write_timeout: number = 60000;
    retries: number = 5;
    port: number = 443;

    ca_certificates: null;
    client_certificate: null;

    constructor(url: string) {
        this.name = faker.word.noun();
        this.tags = [
            faker.word.adjective(),
            faker.word.adjective(),
            faker.word.adjective(),
        ];
        this.url = url;
    }
}

export class Service implements ServiceBase {
    id: string;
    created_at: number;
    updated_at: number;
    name: string;

    protocol: string;
    host: string;
    path: string;
    port: number;

    tags: string[];

    enabled: boolean;

    retries: number;
    connect_timeout: number;
    write_timeout: number;
    read_timeout: number;

    tls_sans: null;
    tls_verify: null;
    tls_verify_depth: null;

    ca_certificates: null;
    client_certificate: null;
}
