import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base_page";
import { Bag } from "../fixtures/setupers";
import { RouteModel } from "../models/route";

export class CreateRoutePage extends BasePage {
    readonly me: Locator;

    readonly nameTextbox: Locator;
    readonly serviceListbox: Locator;
    readonly pathTextbox: Locator;
    readonly methodsListbox: Locator;
    readonly hostTextbox: Locator;

    readonly submitButton: Locator;

    constructor(bag: Bag, page: Page) {
        super(bag, page);
        this.path = `/${this.workspace_name}/routes/create`;
        this.me = this.page.getByTestId("kong-ui-app-layout-main");

        this.nameTextbox = this.me.getByTestId("route-form-name");
        this.serviceListbox = this.me.getByTestId("route-form-service-id");
        this.pathTextbox = this.me.getByTestId("route-form-paths-input-1");
        this.methodsListbox = this.me.getByTestId("multiselect-trigger");
        this.hostTextbox = this.me.getByTestId("route-form-hosts-input-1");

        this.submitButton = this.me.getByTestId("route-create-form-submit");
    }

    async fillForm(data: RouteModel) {
        await this.nameTextbox.fill(data.name);
        await this.pathTextbox.fill(data.path);
        await this.selectMethods(data.methods);
        await this.hostTextbox.fill(data.host);
    }

    async submitAndStore(): Promise<object> {
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

        return responseBody;
    }

    async selectService(id: string): Promise<void> {
        await this.serviceListbox.click();
        await this.page.getByTestId(`select-item-${id}`).click();
    }

    private async selectMethods(methods: string[]) {
        await this.methodsListbox.click();

        for (const method of methods) {
            await this.page.getByTestId(`multiselect-item-${method}`).click();
        }

        await this.page.press("body", "Escape");
    }
}
