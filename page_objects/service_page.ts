import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base_page";
import { Bag } from "../fixtures/setupers";

export class ServicePage extends BasePage {
    readonly idTextbox: Locator;
    readonly nameTextbox: Locator;

    //makes sense to create a navMenu component
    readonly routesButton: Locator;

    //makes sense to create a component for all of those subpages
    readonly newRouteButton: Locator;

    constructor(bag: Bag, page: Page) {
        super(bag, page);
        this.workspace_name = "default";
        //need to find a way to distinguish specific services and passing id into constructor
        this.path = `/${this.workspace_name}/services/${this.bag.services.at(0)?.id}`;

        this.idTextbox = this.page.getByTestId("id-property-value");
        this.nameTextbox = this.page.getByTestId("name-property-value");

        this.routesButton = this.page.getByTestId("service-routes");

        this.newRouteButton = this.page.locator(
            "[data-testid='toolbar-add-route'],[data-testid='empty-state-action']"
        );
    }
}
