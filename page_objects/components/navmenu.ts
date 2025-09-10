import { Page, Locator } from "@playwright/test";

export class NavMenu {
    readonly me: Locator;

    constructor(page: Page) {
        this.me = page.locator("nav[aria-label='Main menu']");
    }

    button(name: string): Locator {
        return this.me.getByRole("button", { name: name });
    }
}
