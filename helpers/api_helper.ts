import { APIRequestContext, request } from "@playwright/test";
import { Bag } from "../fixtures/setupers";
import { Service, ServiceModel } from "../models/service";

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

    async GetService(id: string): Promise<number> {
        const request = await this.CreateContext();
        const response = await request.get(`default/services/${id}`);

        return response.status();
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
}
