import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base_page";
import { Bag } from "../fixtures/setupers";

export class WorkspacesPage extends BasePage {
    readonly defaultWorkspaceLink: Locator;

    constructor(bag: Bag, page: Page) {
        super(bag, page);
        this.path = "/workspaces";

        this.defaultWorkspaceLink = this.page.getByTestId(
            "workspace-link-default"
        );
    }
}
