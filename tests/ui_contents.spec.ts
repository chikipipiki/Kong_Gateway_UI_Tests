import { test, expect } from "../fixtures/poms";

// Showcase of snapshot testing for UI contents
test("check overview card content", async ({
    Workspace: { Overview: overview },
}) => {
    await overview.goto();
    await expect(overview.page).toHaveURL(/default\/overview/);
    await expect(overview.card).toMatchAriaSnapshot({
        name: "overview_card.yml",
    });
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
