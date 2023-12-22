import * as contactsServise from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";
const listContacts = async (req, res) => {
  try {
    const result = await contactsServise.listContacts();

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await contactsServise.getContactById(id);

    if (!result) {
      throw HttpError(404);
    }

    res.json(result);
  } catch (error) {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({
      message,
    });
  }
};

export default {
  listContacts,
  getContactById,
};
