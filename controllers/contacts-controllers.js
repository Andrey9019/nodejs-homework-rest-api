import { HttpError } from "../helpers/index.js";
import * as contactsServise from "../models/contacts.js";

import {
  contactAddShema,
  contactUpdateShema,
} from "../shemas/contact-shemas.js";

const listContacts = async (req, res, next) => {
  try {
    const result = await contactsServise.listContacts();

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsServise.getContactById(id);

    if (!result) {
      throw HttpError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = contactAddShema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsServise.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateBiId = async (req, res, next) => {
  try {
    const { error } = contactUpdateShema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const result = await contactsServise.updateContactsById(id, req.body);
    if (!result) {
      throw HttpError(404, `Movie with id=${id} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsServise.removeContact(id);
    if (!result) {
      throw HttpError(404);
    }

    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

export default {
  listContacts,
  getContactById,
  addContact,
  updateBiId,
  deleteByID,
};
