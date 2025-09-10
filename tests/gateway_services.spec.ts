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
