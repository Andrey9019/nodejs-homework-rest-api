import Contact from "../models/Contact.js";

import { HttpError } from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

import {
  contactAddShema,
  contactUpdateShema,
} from "../shemas/contact-shemas.js";

const listContacts = async (req, res) => {
  const result = await Contact.find();

  res.json(result);
};

// const getContactById = async (req, res, ) => {
//   const { id } = req.params;
//   const result = await contactsServise.getContactById(id);

//   if (!result) {
//     throw HttpError(404);
//   }
//   res.json(result);
// };

// const addContact = async (req, res) => {
//   const result = await contactsServise.addContact(req.body);
//   res.status(201).json(result);
// };

// const updateBiId = async (req, res) => {
//   const { id } = req.params;
//   const result = await contactsServise.updateContactsById(id, req.body);
//   if (!result) {
//     throw HttpError(404, `Contact with id=${id} not found`);
//   }
//   res.json(result);
// };

// const deleteByID = async (req, res, ) => {
//   const { id } = req.params;
//   const result = await contactsServise.removeContact(id);
//   if (!result) {
//     throw HttpError(404);
//   }
//   res.json({ message: "Contact deleted" });
// };

export default {
  listContacts: ctrlWrapper(listContacts),
  // getContactById : ctrlWrapper(getContactById),
  // addContact: ctrlWrapper(addContact),
  // updateBiId: ctrlWrapper(updateBiId),
  // deleteByID : ctrlWrapper(deleteByID),
};
