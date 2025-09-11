import { test, expect } from "../fixtures/poms";
import { RouteModel } from "../models/route";

test("create route", async ({
    Workspace: { CreateRoute: create_route, Route: route_page },
    Notifier: notifier,
    api_helper,
}) => {
    const init_service = await api_helper.CreateService();
    await create_route.goto();

    const routeModel = new RouteModel("localhost");

    await create_route.selectService(init_service.id);
    await create_route.fillForm(routeModel);

    await create_route.submitAndStore();

    await Promise.all([
        expect(notifier.alert).toBeVisible(),
        expect(notifier.alert).toHaveAttribute("class", /success/),
        expect(notifier.alert).toHaveText(
            `Route "${routeModel.name}" successfully created!`
        ),
        expect(route_page.nameTextbox).toBeVisible(),
        expect(route_page.nameTextbox).toHaveText(routeModel.name),
    ]);
});

/* 
Other tests that should be included:
- update route
- delete route
- create route validations
- create multiple routes for service
*/
