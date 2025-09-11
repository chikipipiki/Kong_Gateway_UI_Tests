import { test, expect } from "../fixtures/poms";
import { ServiceModel } from "../models/service";

test("has title", async ({ page }) => {
    await page.goto("/");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Workspaces/);
});

test("check page content", async ({
    page,
    Workspace: { Overview: overview },
}) => {
    await overview.goto();
    await expect(page).toHaveURL(/default\/overview/);
});

test("add service", async ({ Workspace: { Overview: overview } }) => {
    await overview.goto();
    await overview.page.getByRole("link", { name: "Gateway Services" }).click();

    await overview.page.getByTestId("toolbar-add-gateway-service").click();
    await expect(overview.page).toHaveURL(/services\/create/);
});

test("check nav menu links", async ({
    Workspace: { Overview: overview },
    Navigation: { NavMenu: navMenu },
}) => {
    await overview.goto();
    await expect(navMenu.me).toMatchAriaSnapshot({
        name: "navigation_menu.yml",
    });
});

test("create service", async ({
    Workspace: { Createservice: create_service },
    Notifier: notifier,
}) => {
    await create_service.goto();

    const serviceModel = new ServiceModel("http://test-api.com/api/v333");

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
