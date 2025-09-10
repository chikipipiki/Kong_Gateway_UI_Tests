import { test as base } from "./setupers";
import { expect as baseExpect } from "@playwright/test";
//components
import { NavMenu } from "../page_objects/components/navmenu";
import { Notifier } from "../page_objects/components/notifier";
//poms
import { CreateServicePage } from "../page_objects/create_service_page";
import { GatewayServicesPage } from "../page_objects/gateway_services_page";
import { WorkspaceOverviewPage } from "../page_objects/workspace_overview_page";
import { ServicePage } from "../page_objects/service_page";
import { CreateRoutePage } from "../page_objects/create_route_page";
import { RoutePage } from "../page_objects/route_page";

interface PageObjectFixtures {
    Workspace: {
        Overview: WorkspaceOverviewPage;
        GatewayServices: GatewayServicesPage;
        CreateService: CreateServicePage;
        Service: ServicePage;
        CreateRoute: CreateRoutePage;
        Route: RoutePage;
    };
    Navigation: NavMenu;
    Notifier: Notifier;
}

export const test = base.extend<PageObjectFixtures>({
    Workspace: async ({ bag, page }, use) => {
        const overview = new WorkspaceOverviewPage(bag, page);
        const gateway_services = new GatewayServicesPage(bag, page);
        const create_service = new CreateServicePage(bag, page);
        const service = new ServicePage(bag, page);
        const create_route = new CreateRoutePage(bag, page);
        const route = new RoutePage(bag, page);

        await use({
            Overview: overview,
            GatewayServices: gateway_services,
            CreateService: create_service,
            Service: service,
            CreateRoute: create_route,
            Route: route,
        });
    },

    Navigation: async ({ page }, use) => {
        const navMenu = new NavMenu(page);

        await use(navMenu);
    },

    Notifier: async ({ page }, use) => {
        const notifier = new Notifier(page);

        await use(notifier);
    },
});

export const expect = baseExpect;
