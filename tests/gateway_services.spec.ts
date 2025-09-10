import { test, expect } from "../fixtures/poms";
import { ServiceModel } from "../models/service";

test("create service", async ({
    Workspace: { Createservice: create_service },
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
        expect(
            create_service.page.getByTestId("name-plain-text")
        ).toBeVisible(),
    ]);
});
