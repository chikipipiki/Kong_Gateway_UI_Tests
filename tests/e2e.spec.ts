import { test, expect } from "../fixtures/poms";
import { ServiceModel } from "../models/service";

test("e2e - workflow - add service + route", async ({
    bag,
    Workspace: {
        Overview: overview,
        GatewayServices: services,
        CreateService: create_service,
        Service: service_page,
        CreateRoute: create_route,
    },
    Navigation: navigation_menu,
}) => {
    await overview.goto();
    await navigation_menu.button("Gateway Services").click();

    await services.newGatewayServiceButton.click();

    const serviceModel = new ServiceModel("https://api.kong-air.com/flights");
    await create_service.nameTextbox.fill(serviceModel.name);
    await create_service.ulrTextbox.fill(serviceModel.url);
    const service = await create_service.submitAndStore();

    await expect(service_page.nameTextbox).toHaveText(service.name);
    await expect(service_page.idTextbox).toContainText(service.id);

    await service_page.routesButton.click();
    await service_page.newRouteButton.click();

    await create_route.nameTextbox.fill("teeeeee");
    await create_route.pathTextbox.fill("/api/testttt");
    await create_route.selectMethods(["GET", "POST", "DELETE"]);
    await create_route.hostTextbox.fill("a.com");

    await create_route.submitAndStore();
});
