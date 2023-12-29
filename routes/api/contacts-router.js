import express from "express";

import contactsControllers from "../../controllers/contacts-controllers.js";

import { isEmptyBody } from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";

import {
  contactAddShema,
  contactUpdateShema,
} from "../../shemas/contact-shemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.listContacts);

// contactsRouter.get("/:id", contactsControllers.getContactById);

// contactsRouter.post(
//   "/",
//   isEmptyBody,
//   validateBody(contactAddShema),
//   contactsControllers.addContact
// );

// contactsRouter.put(
//   "/:id",
//   isEmptyBody,
//   validateBody(contactUpdateShema),
//   contactsControllers.updateBiId
// );

// contactsRouter.delete("/:id", contactsControllers.deleteByID);

export default contactsRouter;
