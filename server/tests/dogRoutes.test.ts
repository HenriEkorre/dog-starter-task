import { describe, expect, test, vi } from "vitest"
import request from 'supertest'
import app from '../app'
import * as dogController from "../controllers/dogController" 



describe("dogRoute", () => {
    test("returns 200 status", async () => {
        const imageURL = "https://images.dog.ceo/breeds/retriever/golden/n02099601_1234.jpg"
        const response = {
            message: imageURL,
            status: "success",
        }
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: vi.fn().mockResolvedValue(response),
        })
        vi.stubGlobal("fetch", fetchMock)
        vi.spyOn(dogController, "getDogImage").mockReturnValue(
        {
            success: true,
            data: {
                imageUrl: imageURL,
                status: "success",
            },
        }
        )

        const res = await request(app)
            .get("/api/dogs/random")
            .send()


        expect(res.status).toBe(200)
        expect(res.body).toEqual({ success: true,
            data: {
                imageUrl: imageURL,
                status: "success",
            },})


    })
    
})