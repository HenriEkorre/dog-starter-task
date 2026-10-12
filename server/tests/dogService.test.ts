import { describe, expect, test, vi } from "vitest"
import { getRandomDogImage } from "../services/dogService"


describe("getRandomDogImage", () => {
    test("returns a random image with a 200 status", async () => {
        const response = {
            message: "https://images.dog.ceo/breeds/retriever/golden/n02099601_1234.jpg",
            status: "success",
        }
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: vi.fn().mockResolvedValue(response),
        })
        vi.stubGlobal("fetch", fetchMock)

        const result = await getRandomDogImage()

        expect(fetchMock).toHaveBeenCalledWith(
            "https://dog.ceo/api/breeds/image/random",
        )
        expect(result).toEqual({
            imageUrl: response.message,
            status: "success",
        })
    })
    
    test("API returns 500 status", async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: false,
            status: 500,
        })
        vi.stubGlobal("fetch", fetchMock)
        await expect(getRandomDogImage()).rejects.toThrowError('Failed to fetch dog image: Dog API returned status 500')
    })
    
})