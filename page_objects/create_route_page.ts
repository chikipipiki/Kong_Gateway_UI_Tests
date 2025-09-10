import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base_page";
import { Bag } from "../fixtures/setupers";

export class CreateRoutePage extends BasePage {
    readonly me: Locator;

    readonly nameTextbox: Locator;

    readonly pathTextbox: Locator;
    readonly methodsListbox: Locator;
    readonly hostTextbox: Locator;

    readonly submitButton: Locator;

    constructor(bag: Bag, page: Page) {
        super(bag, page);
        this.path = `/${this.workspace_name}/services/create`;
        this.me = this.page.getByTestId("kong-ui-app-layout-main");

        this.nameTextbox = this.me.getByTestId("route-form-name");
        this.pathTextbox = this.me.getByTestId("route-form-paths-input-1");
        this.methodsListbox = this.me.getByTestId("multiselect-trigger");
        this.hostTextbox = this.me.getByTestId("route-form-hosts-input-1");

        this.submitButton = this.me.getByTestId("route-create-form-submit");
    }

    async selectMethods(methods: string[]) {
        await this.methodsListbox.click();

        for (const method of methods) {
            await this.page.getByTestId(`multiselect-item-${method}`).click();
        }

        await this.page.press("body", "Escape");
    }

    async submitAndStore(): Promise<void> {
        const [response] = await Promise.all([
            this.page.waitForResponse(
                (res) =>
                    res.url().includes("/routes") &&
                    res.request().method() === "POST"
            ),
            this.submitButton.click(),
        ]);

        const responseBody = await response.json();
        this.bag.routes.push(responseBody);
    }
}
