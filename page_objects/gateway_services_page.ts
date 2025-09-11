import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base_page";
import { Bag } from "../fixtures/setupers";
import { DropdownMenu } from "./components/dropdown_menu";
import { Modal } from "./components/modal";

export class GatewayServicesPage extends BasePage {
    readonly newGatewayServiceButton: Locator;

    readonly modal: Modal;

    constructor(bag: Bag, page: Page) {
        super(bag, page);
        this.workspace_name = "default";
        this.path = `/${this.workspace_name}/services`;

        this.newGatewayServiceButton = this.page.locator(
            "[data-testid='toolbar-add-gateway-service'],[data-testid='empty-state-action']"
        );

        this.modal = new Modal(this.page.locator(".modal-container"));
    }

    async startEditingService(id: string) {
        const service = this.page.locator(`tr[data-rowid="${id}"]`);
        await service.getByTestId("actions").click();

        let dropdownMenu = new DropdownMenu(
            service.getByTestId("dropdown-list")
        );

        await dropdownMenu.editButton.click();
    }

    async startDeletingService(id: string) {
        const service = this.page.locator(`tr[data-rowid="${id}"]`);
        await service.getByTestId("actions").click();

        let dropdownMenu = new DropdownMenu(
            service.getByTestId("dropdown-list")
        );

        await dropdownMenu.deleteButton.click();
    }
}
