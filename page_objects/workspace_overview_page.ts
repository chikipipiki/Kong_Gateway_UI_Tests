import { Page } from "@playwright/test";
import { BasePage } from "./base_page";
import { Bag } from "../fixtures/setupers";

export class WorkspaceOverviewPage extends BasePage {
    constructor(bag: Bag, page: Page) {
        super(bag, page);
        this.workspace_name = "default";
        this.path = `/${this.workspace_name}/overview`;
    }
}
