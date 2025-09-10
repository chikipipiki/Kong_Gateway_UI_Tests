import { test as base } from "@playwright/test";
import { Service } from "../models/service";
import { ApiHelper } from "../helpers/api_helper";

export interface Bag {
    ui_url: string;
    api_url: string;
    services: Service[];
    //oversimplified version, can be implemented the same way as Services
    routes: object[];
}

interface Setupers {
    bag: Bag;
    tear_down: void;
    api_helper: ApiHelper;
}

export const test = base.extend<Setupers>({
    bag: [
        async ({}, use, testInfo) => {
            const bag: Bag = {
                ui_url: "http://localhost:8002",
                api_url: "http://localhost:8001",
                services: [],
                routes: [],
            };

            await use(bag);

            testInfo.attach("bag", {
                body: JSON.stringify(bag, null, 4),
            });
        },
        { auto: true },
    ],

    tear_down: [
        async ({ bag, api_helper }, use) => {
            await use();

            for (const route of bag.routes) {
                if (route["id"]) await api_helper.DeleteRoute(route["id"]);
            }

            for (const service of bag.services) {
                if (service.id) await api_helper.DeleteService(service.id);
            }
        },
        { auto: true },
    ],

    api_helper: async ({ bag }, use) => {
        const api_helper = new ApiHelper(bag);

        await use(api_helper);
    },
});
