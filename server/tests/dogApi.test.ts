import { describe, expect, test, vi } from "vitest"
import request from 'supertest'
import app from '../app'



describe("dogRoute", () => {
    test("returns 500 status", async () => {
        
        const fetchMock = vi.fn().mockRejectedValue(new Error("Network error"))
        vi.stubGlobal("fetch", fetchMock)

        const res = await request(app)
            .get("/api/dogs/random")
            .send()

        expect(fetchMock).toHaveBeenCalledWith(
            "https://dog.ceo/api/breeds/image/random",
        )

        expect(res.status).toBe(500)
        expect(res.body).toEqual({
            success: false,
            error: "Failed to fetch dog image: Network error"
        }
        )


    })
    
})