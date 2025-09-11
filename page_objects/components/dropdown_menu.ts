import { Locator } from "@playwright/test";

export class DropdownMenu {
    readonly me: Locator;
    readonly editButton: Locator;
    readonly deleteButton: Locator;

    constructor(me: Locator) {
        this.me = me;

        this.editButton = this.me.getByTestId("action-entity-edit");
        this.deleteButton = this.me.getByTestId("action-entity-delete");
    }
}
