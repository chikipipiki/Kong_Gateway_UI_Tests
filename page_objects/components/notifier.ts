import { Locator, Page } from "@playwright/test";

export class Notifier {
    readonly container: Locator;
    readonly alert: Locator;

    constructor(page: Page) {
        this.container = page.locator("#kongponents-toaster-container");
        this.alert = this.container.getByRole("alert");
    }
}
