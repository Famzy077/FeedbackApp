import { Router } from "express";
import { createFeedback } from "../controller/feedback.controller";

const route = Router();
route.post('/feedback', createFeedback)

export default route;