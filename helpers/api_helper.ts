import { APIRequestContext, request } from "@playwright/test";
import { Bag } from "../fixtures/setupers";
import { Service, ServiceModel } from "../models/service";
import path from "path";

export class ApiHelper {
    protected bag: Bag;

    constructor(bag: Bag) {
        this.bag = bag;
    }

    private CreateContext(): Promise<APIRequestContext> {
        return request.newContext({
            baseURL: this.bag.api_url,
            extraHTTPHeaders: {
                "X-Kong-Manager-Version": "3.11.0.1",
                "X-Request-Source": "kong-manager",
            },
        });
    }

    async GetService(id: string): Promise<Service> {
        const request = await this.CreateContext();
        const response = await request.get(`default/services/${id}`);

        const service = Object.assign(new Service(), await response.json());
        return service;
    }

    async GetServices(): Promise<any> {
        const request = await this.CreateContext();
        const response = await request.get(`default/services`);

        return await response.json();
    }

    async CreateService(): Promise<Service> {
        const request = await this.CreateContext();
        const serviceModel = new ServiceModel(
            "https://api.kong-air.com/flights"
        );

        const response = await request.post("default/services", {
            data: serviceModel,
        });

        if (response.status() !== 201) {
            console.log(response.statusText());
        }

        const service = Object.assign(new Service(), await response.json());
        this.bag.services.push(service);
        return service;
    }

    async DeleteService(id: string): Promise<void> {
        const request = await this.CreateContext();

        const response = await request.delete(`default/services/${id}`);

        if (response.status() != 204) {
            console.log(`something went wronmg: ${response.statusText()}`);
        }
    }

    async DeleteRoute(id: string): Promise<void> {
        const request = await this.CreateContext();

        const response = await request.delete(`default/routes/${id}`);

        if (response.status() != 204) {
            console.log(`something went wronmg: ${response.statusText()}`);
        }
    }

    async CheckRoute(route: object): Promise<object> {
        //quick and dirty solution
        await new Promise((resolve) => setTimeout(resolve, 5000));

        const context = await request.newContext({
            //can construct from object
            baseURL: "http://localhost:8000",
        });

        const paht = `${route["paths"][0]}`.slice(1);
        const response = await context.get(paht);

        return await response.json();
    }
}
