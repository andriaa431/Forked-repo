import { Router } from "express"
import {
  archiveEmail,
  createEmail,
  deleteEmail,
  getEmail,
  getEmailCategory
} from "../controllers/emailControllers.js"
import { protectRoute, validateBody } from "../middleware.js"

export const emailRouter = Router()

emailRouter.post(
  "/",
  protectRoute,
  // TODO: add validateBody middleware and pass in emailComposeSchema
  validateBody(emailComposeSchema),
  createEmail
)
emailRouter.get("/c/:mailbox", protectRoute, getEmailCategory)
emailRouter.get("/:emailId", protectRoute, getEmail)
emailRouter.patch("/:id", protectRoute, archiveEmail)
emailRouter.delete("/:id", protectRoute, deleteEmail)
