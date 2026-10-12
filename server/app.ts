import express, { Request, Response, NextFunction, Express } from "express"
import cors from "cors"
import dogRoutes from "./routes/dogRoutes"

const app: Express = express()

app.use(cors())
app.use(express.json())

app.use("/api/dogs", dogRoutes)

app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ status: "Server is running" })
})

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error("Unhandled Error:", err)

    res.status(500).json({
        success: false,
        error: err.message || "Internal Server Error",
    })
})

app.use((_req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        error: "Route not found",
    })
})

export default app