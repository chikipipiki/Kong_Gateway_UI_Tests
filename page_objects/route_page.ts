import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base_page";
import { Bag } from "../fixtures/setupers";

export class RoutePage extends BasePage {
    readonly idTextbox: Locator;
    readonly nameTextbox: Locator;

    constructor(bag: Bag, page: Page) {
        super(bag, page);
        this.workspace_name = "default";
        //need to find a way to distinguish specific services and passing id into constructor

        this.idTextbox = this.page.getByTestId("id-property-value");
        this.nameTextbox = this.page.getByTestId("name-property-value");
    }
}
