import express from "express";
import { validateBody } from "../../decorators/index.js";
import { isEmptyBody, isValidId } from "../../middlewares/index.js";
import contactsControllers from "../../controllers/contacts-controllers.js";
import {
  contactAddSchema,
  contactUpdateSchema,
  contactUpdateFavoriteSchema,
} from "../../models/Contact.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.listContacts);

contactsRouter.get("/:id", isValidId, contactsControllers.getContactById);

contactsRouter.post(
  "/",
  isEmptyBody("missing fields"),
  validateBody(contactAddSchema),
  contactsControllers.addContact
);

contactsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody("missing fields"),
  validateBody(contactUpdateSchema),
  contactsControllers.updateBiId
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  isEmptyBody("missing field favorite"),
  validateBody(contactUpdateFavoriteSchema),
  contactsControllers.updateBiId
);

contactsRouter.delete("/:id", isValidId, contactsControllers.deleteByID);

export default contactsRouter;
