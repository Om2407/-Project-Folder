import express from "express"
import { generateQuiz, searchWithAi } from "../controllers/aiController.js"

let aiRouter = express.Router()

aiRouter.post("/search",searchWithAi)
aiRouter.post("/generate-quiz", generateQuiz)

export default aiRouter