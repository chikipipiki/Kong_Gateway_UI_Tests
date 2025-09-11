import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base_page";
import { Bag } from "../fixtures/setupers";

export class WorkspaceOverviewPage extends BasePage {
    readonly me: Locator;
    readonly card: Locator;

    constructor(bag: Bag, page: Page) {
        super(bag, page);
        this.workspace_name = "default";
        this.path = `/${this.workspace_name}/overview`;

        this.me = this.page.getByTestId("kong-ui-app-layout-main");
        this.card = this.me.getByTestId("overview-card");
    }
}
