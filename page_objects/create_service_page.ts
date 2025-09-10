import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base_page";
import { Bag } from "../fixtures/setupers";
import { Service } from "../models/service";

export class CreateServicePage extends BasePage {
    readonly me: Locator;
    readonly urlRadio: Locator;
    readonly protocolRadio: Locator;
    readonly ulrTextbox: Locator;

    readonly nameTextbox: Locator;

    readonly submitButton: Locator;

    constructor(bag: Bag, page: Page) {
        super(bag, page);
        this.path = `/${this.workspace_name}/services/create`;
        this.me = this.page.getByTestId("kong-ui-app-layout-main");

        this.urlRadio = this.me.getByTestId("gateway-service-url-radio-label");
        this.protocolRadio = this.me.getByTestId(
            "gateway-service-protocol-radio-label"
        );

        this.ulrTextbox = this.me.getByTestId("gateway-service-url-input");
        this.nameTextbox = this.me.getByTestId("gateway-service-name-input");

        this.submitButton = this.me.getByTestId("service-create-form-submit");
    }

    async submitAndStore(): Promise<Service> {
        const [response] = await Promise.all([
            this.page.waitForResponse(
                (res) =>
                    res.url().includes("/default/services") &&
                    res.request().method() === "POST"
            ),
            this.submitButton.click(),
        ]);

        const responseBody = await response.json();
        const service = Object.assign(new Service(), responseBody);
        this.bag.services.push(service);

        return service;
    }
}
