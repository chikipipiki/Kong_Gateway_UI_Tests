import { test, expect } from "../fixtures/poms";

test("check page content", async ({ Workspace: { Overview: overview } }) => {
    await overview.goto();
    await expect(overview.page).toHaveURL(/default\/overview/);
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
