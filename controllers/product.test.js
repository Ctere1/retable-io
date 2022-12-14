const request = require("supertest");
const baseURL = "http://localhost:5001/";

describe("Properly creates and gets a product", () => {
    const product = {
        id: 'test_sku',
        name: 'Blue Dress',
        inventory: 44,
        updated_at: '08/10/2022 17:57:36',
        created_at: '08/10/2022 17:57:36'
    }
    beforeAll(async () => {
        await request(baseURL).post("api/product").send(product);
    })
    afterAll(async () => {
        await request(baseURL).delete("api/product/test_sku")
    })
    it("Returns 200", async () => {
        const response = await request(baseURL).get("api/product/test_sku");
        expect(response.statusCode).toBe(200);
        expect(response.body).not.toBe(null);
    });
    it("Returns the product object", async () => {
        const response = await request(baseURL).get("api/product/test_sku");
        expect(response.body != null).toBe(true);
    });
});

describe("Properly deletes product", () => {
    const product = {
        id: 'test_sku',
        name: 'Blue Dress',
        inventory: 44,
        updated_at: '08/10/2022 17:57:36',
        created_at: '08/10/2022 17:57:36'
    }
    beforeAll(async () => {
        await request(baseURL).post("api/product").send(product);
    })
    it("Returns 200", async () => {
        const response = await request(baseURL).delete("api/product/test_sku");
        expect(response.statusCode).toBe(200);
    });
    it("Checks if the product has been deleted", async () => {
        const response = await request(baseURL).get("api/product/test_sku");
        expect(response.statusCode).toBe(404);
    });
});

describe("Properly updates a product", () => {
    const product = {
        id: 'test_sku',
        name: 'Blue Dress',
        inventory: 44,
        updated_at: '08/10/2022 17:57:36',
        created_at: '08/10/2022 17:57:36'
    }
    beforeAll(async () => {
        await request(baseURL).post("api/product").send(product);
    })
    afterAll(async () => {
        await request(baseURL).delete("api/product/test_sku")
    })
    it("Returns 200", async () => {
        product.name = 'changed';
        product.inventory = 56;
        const response = await request(baseURL).put("api/product").send(product);
        expect(response.statusCode).toBe(200);
        expect(response.body).not.toBe(null);
        expect(response.body.name).toBe('changed');
        expect(response.body.inventory).toBe(56);
    });
    it("Returns the product object", async () => {
        const response = await request(baseURL).get("api/product/test_sku");
        expect(response.body != null).toBe(true);
    });
});

