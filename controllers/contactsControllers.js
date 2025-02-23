import HttpError from "../helpers/HttpError.js";
import * as s from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const contacts = await s.listContacts(req.user.id);

  res.status(200).json(contacts);
};

export const getOneContact = async (req, res) => {
  const contact = await s.getContactById({
    contactId: req.params.id,
    userId: req.user.id,
  });
  if (!contact) {
    throw HttpError(404);
  }

  res.status(200).json(contact);
};

export const deleteContact = async (req, res) => {
  const contact = await s.deleteContact({
    contactId: req.params.id,
    userId: req.user.id,
  });
  if (!contact) {
    throw HttpError(404);
  }

  res.status(200).json(contact);
};

export const createContact = async (req, res) => {
  const contact = await s.createContact({
    data: req.body,
    userId: req.user.id,
  });

  res.status(201).json(contact);
};

export const updateContact = async (req, res) => {
  if (!Object.keys(req.body).length) {
    throw HttpError(400, "Body must have at least one field");
  }
  const contact = await s.updateContact({
    contactId: req.params.id,
    data: req.body,
    userId: req.user.id,
  });
  if (!contact) {
    throw HttpError(404);
  }

  res.status(200).json(contact);
};

export const updateStatusContact = async (req, res) => {
  const contact = await s.updateStatusContact({
    contactId: req.params.id,
    data: req.body,
    userId: req.user.id,
  });
  if (!contact) {
    throw HttpError(404);
  }

  res.status(200).json(contact);
};
