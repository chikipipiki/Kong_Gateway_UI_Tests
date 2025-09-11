import { test, expect } from "../fixtures/poms";
import { RouteModel } from "../models/route";
import { ServiceModel } from "../models/service";
import expectedResult from "./test_result.json";

test("e2e - workflow - add service + route", async ({
    api_helper,
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

    const routeModel = new RouteModel("localhost");
    await create_route.fillForm(routeModel);
    const route = await create_route.submitAndStore();

    await expect(
        service_page.page.locator(`[data-rowid="${route["id"]}"]`)
    ).toBeVisible();

    expect(await api_helper.CheckRoute(route)).toEqual(expectedResult);
});
