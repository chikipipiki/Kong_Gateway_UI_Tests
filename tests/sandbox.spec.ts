import { test, expect } from "../fixtures/poms";

// Tests won't run during main execution, meant for sandboxing only
test.describe("sandbox", () => {
    test("use api to create a service", async ({ api_helper }) => {
        const service = await api_helper.CreateService();
        expect(await api_helper.GetService(service.id)).toBe(200);
    });

    test("remove all services", async ({ api_helper }) => {
        const res = await api_helper.GetServices();

        for (const s of res.data) {
            await api_helper.DeleteService(s.id);
        }
    });
});
