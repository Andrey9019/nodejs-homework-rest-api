import express from "express";

import contactsControllers from "../../controllers/contacts-controllers.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.listContacts);

contactsRouter.get("/:id", contactsControllers.getContactById);

export default contactsRouter;
