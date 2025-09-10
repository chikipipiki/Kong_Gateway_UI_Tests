import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base_page";
import { Bag } from "../fixtures/setupers";

export class GatewayServicesPage extends BasePage {
    readonly newGatewayServiceButton: Locator;

    constructor(bag: Bag, page: Page) {
        super(bag, page);
        this.workspace_name = "default";
        this.path = `/${this.workspace_name}/services`;

        this.newGatewayServiceButton = this.page.locator(
            "[data-testid='toolbar-add-gateway-service'],[data-testid='empty-state-action']"
        );
    }
}
