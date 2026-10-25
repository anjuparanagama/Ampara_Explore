import { test, expect } from "@playwright/test";

test.describe("Backend API Integration & Contract Tests", () => {
  test("GET /api/attractions returns 200 and schema compliant destination records", async ({
    request,
  }) => {
    const response = await request.get("/api/attractions");
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body.attractions)).toBe(true);

    if (body.attractions.length > 0) {
      const first = body.attractions[0];
      expect(first).toHaveProperty("id");
      expect(first).toHaveProperty("name");
      expect(first).toHaveProperty("category_name");
      expect(first).toHaveProperty("distance_km");
      expect(first).toHaveProperty("image");
    }
  });

  test("GET /api/attractions?radius=15 enforces radial distance boundary filter", async ({
    request,
  }) => {
    const response = await request.get("/api/attractions?radius=15");
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body.attractions)).toBe(true);

    for (const place of body.attractions) {
      expect(Number(place.distance_km)).toBeLessThanOrEqual(15);
    }
  });

  test("GET /api/attractions/[id] returns 404 for non-existent destination identifier", async ({
    request,
  }) => {
    const response = await request.get("/api/attractions/non-existent-destination-xyz-9999");
    expect(response.status()).toBe(404);

    const body = await response.json();
    expect(body.message).toMatch(/Attraction not found|not found/i);
  });

  test("GET /api/categories returns 200 with list of travel interest categories", async ({
    request,
  }) => {
    const response = await request.get("/api/categories");
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body.categories)).toBe(true);
    expect(body.categories.length).toBeGreaterThan(0);

    const cat = body.categories[0];
    expect(cat).toHaveProperty("id");
    expect(cat).toHaveProperty("name");
  });

  test("POST /api/auth/login rejects empty or malformed authentication requests", async ({
    request,
  }) => {
    const response = await request.post("/api/auth/login", {
      data: { email: "", password: "" },
    });
    expect([400, 401]).toContain(response.status());
  });

  test("GET /api/auth/me returns null or unauthenticated user for guest requests", async ({
    request,
  }) => {
    const response = await request.get("/api/auth/me");
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.user).toBeNull();
  });

  test("POST /api/plans/stops rejects unauthorized itinerary updates with 401", async ({
    request,
  }) => {
    const response = await request.post("/api/plans/stops", {
      data: { attractionId: "test-attraction" },
    });
    expect(response.status()).toBe(401);
  });
});
