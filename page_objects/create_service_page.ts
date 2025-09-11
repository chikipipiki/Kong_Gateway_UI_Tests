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

    async submitAndStore() {
        await this.submitButton.click();

        await this.page.route("*/**/default/services", async (route, req) => {
            if (req.method() === "POST") {
                const response = await route.fetch();
                const service = Object.assign(
                    new Service(),
                    await response.json()
                );
                this.bag.services.push(service);
                await route.fulfill({ response });
            }
        });
    }
}
