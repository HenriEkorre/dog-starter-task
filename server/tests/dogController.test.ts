import { describe, expect, test, vi } from "vitest"
import { getDogImage } from "../controllers/dogController" 

const mockResponce = () => {
    const res: any = {}
    res.status = vi.fn().mockReturnThis()
    res.json = vi.fn()
    return res
}

describe("getDogImage", () => {
    test("returns a random image with a 200 status", async () => {
        const res = mockResponce()
        const req: any = {}
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

        await getDogImage(req, res)

        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: {
                imageUrl: response.message,
                status: "success",
            },
        })


    })
    
})