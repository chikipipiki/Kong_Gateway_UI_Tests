import { test as base } from "./setupers";
import { expect as baseExpect } from "@playwright/test";
import { WorkspaceOverviewPage } from "../page_objects/workspace_overview";
import { NavMenu } from "../page_objects/components/navmenu";
import { CreateServicePage } from "../page_objects/create_service_page";
import { Notifier } from "../page_objects/components/notifier";

interface PageObjectFixtures {
    Workspace: {
        Overview: WorkspaceOverviewPage;
        Createservice: CreateServicePage;
    };
    Navigation: { NavMenu: NavMenu };
    Notifier: Notifier;
}

export const test = base.extend<PageObjectFixtures>({
    Workspace: async ({ bag, page }, use) => {
        const overview = new WorkspaceOverviewPage(bag, page);
        const create_service = new CreateServicePage(bag, page);

        await use({ Overview: overview, Createservice: create_service });
    },

    Navigation: async ({ page }, use) => {
        const navMenu = new NavMenu(page);

        await use({ NavMenu: navMenu });
    },

    Notifier: async ({ page }, use) => {
        const notifier = new Notifier(page);

        await use(notifier);
    },
});

export const expect = baseExpect;
