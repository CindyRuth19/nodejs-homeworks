import { Contact } from "../models/contactsModel.js";
import {
  contactValidation,
  favoriteValidation,
} from "../validations/validation.js";
import { httpError } from "../helpers/httpError.js";
//import { exit } from "node:process";

//exit(1);

const getAllContacts = async (_req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) {
    throw httpError(404, "Contact ID not found😖");
  }

  res.json(result);
};

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    throw httpError(404, "😡");
    //return process.exit(1);
  }
  res.json({ message: "Contact deleted🗑️" });
};

const addContact = async (req, res) => {
  const { error } = contactValidation.validate(req.body);
  if (error) {
    throw httpError(400, "missing required field");
  }
  const result = await Contact.create(req.body);
  res.status(201, "Contact successfully added🎉").json(result);
};

const updateContactById = async (req, res) => {
  const { error } = contactValidation.validate(req.body);
  if (error) {
    throw httpError(400, "missing fields");
  }

  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw httpError(404, "😡");
  }
  //res.json(result);
  res.status(201).json(result);
};

const updateStatusContact = async (req, res) => {
  const { error } = favoriteValidation.validate(req.body);

  if (error) {
    throw httpError(400, "missing field favorite😭");
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw httpError(404, "😡");
  }
  res.json(result);
};

export {
  getAllContacts,
  getContactById,
  deleteContactById,
  addContact,
  updateContactById,
  updateStatusContact,
};
