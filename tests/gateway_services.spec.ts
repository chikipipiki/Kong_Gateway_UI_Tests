import { test, expect } from "../fixtures/poms";
import { ServiceModel } from "../models/service";

test("create service", async ({
    Workspace: { CreateService: create_service, Service: service_page },
    Notifier: notifier,
}) => {
    await create_service.goto();

    const serviceModel = new ServiceModel("https://api.kong-air.com/flights");

    await create_service.nameTextbox.fill(serviceModel.name);
    await create_service.ulrTextbox.fill(serviceModel.url);

    await create_service.submitAndStore();

    await Promise.all([
        expect(notifier.alert).toBeVisible(),
        expect(notifier.alert).toHaveAttribute("class", /success/),
        expect(notifier.alert).toHaveText(
            `Gateway Service "${serviceModel.name}" successfully created!`
        ),
        expect(service_page.nameTextbox).toBeVisible(),
        expect(service_page.nameTextbox).toHaveText(serviceModel.name),
    ]);
});

test("service name validation", async ({
    Workspace: { CreateService: create_service },
    api_helper,
}) => {
    const init_service = await api_helper.CreateService();

    await create_service.goto();
    await create_service.nameTextbox.fill(init_service.name);
    await create_service.ulrTextbox.fill("https://api.kong-air.com/flights");

    await create_service.submitButton.click();

    await Promise.all([
        expect(create_service.formErrorTextbox).toBeVisible(),
        expect(create_service.formErrorTextbox).toContainText(
            `UNIQUE violation detected on '{name="${init_service.name}"}'`
        ),
    ]);
});

test("service URL validation", async ({
    Workspace: { CreateService: create_service },
}) => {
    const serviceModel = new ServiceModel("https://api.kong-air.com/flights");

    await create_service.goto();
    await create_service.nameTextbox.fill(serviceModel.name);
    await create_service.ulrTextbox.fill("test");

    await expect(
        create_service.page.getByText(
            "The URL must follow a valid format. Example: https://api.kong-air.com/flights"
        )
    ).toBeVisible();
    await expect(create_service.submitButton).toBeDisabled();
});

//unpolished
test("edit service", async ({
    api_helper,
    page,
    Workspace: { GatewayServices: services, Service: service_page },
}) => {
    const init_service = await api_helper.CreateService();

    await services.goto();

    await services.startEditingService(init_service.id);

    await expect(page).toHaveURL(
        new RegExp(`services/${init_service.id}/update`)
    );

    //ideally this needs to be moved to POM
    await expect(page.getByTestId("service-edit-form-submit")).toBeDisabled();

    await page.getByTestId("gateway-service-host-input").fill("example.com");
    await page.getByTestId("gateway-service-name-input").fill("new");

    await page.getByTestId("service-edit-form-submit").click();

    await expect(service_page.nameTextbox).toBeVisible();
    await expect(service_page.nameTextbox).toHaveText("new");

    const serv = await api_helper.GetService(init_service.id);
    expect(serv.name).toBe("new");
    expect(serv.host).toBe("example.com");
});

test("delete service", async ({
    api_helper,
    Workspace: { GatewayServices: services },
}) => {
    const init_service = await api_helper.CreateService();

    await services.goto();

    await services.startDeletingService(init_service.id);
    await expect(services.modal.me).toBeVisible();

    await services.modal.confirmationTextbox.fill(init_service.name);
    await services.modal.actionButton.click();

    await expect(services.modal.me).toBeVisible({ visible: false });

    const serv = await api_helper.GetService(init_service.id);

    expect(serv.message).toBe("Not found");
});
