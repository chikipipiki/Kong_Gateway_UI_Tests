import { Locator } from "@playwright/test";

export class Modal {
    readonly me: Locator;
    readonly cancelButton: Locator;
    readonly actionButton: Locator;
    readonly confirmationTextbox: Locator;

    constructor(me: Locator) {
        this.me = me;

        this.cancelButton = this.me.getByTestId("modal-cancel-button");
        this.actionButton = this.me.getByTestId("modal-action-button");
        this.confirmationTextbox = this.me.getByTestId("confirmation-input");
    }
}
