import { test, expect } from "../fixtures/poms";

test("check page content", async ({
    page,
    Workspace: { Overview: overview },
}) => {
    await overview.goto();
    await expect(page).toHaveURL(/default\/overview/);
});

test("check nav menu links", async ({
    Workspace: { Overview: overview },
    Navigation: navMenu,
}) => {
    await overview.goto();
    await expect(navMenu.me).toMatchAriaSnapshot({
        name: "navigation_menu.yml",
    });
});
