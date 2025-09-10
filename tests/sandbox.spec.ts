import { test, expect } from "../fixtures/poms";

test.describe("sandbox", () => {
    test("use api to create a service", async ({ api_helper }) => {
        const service = await api_helper.CreateService();

        expect(await api_helper.GetService(service.id)).toBe(200);
    });
});
