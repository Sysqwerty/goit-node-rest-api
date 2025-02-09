import HttpError from "../helpers/HttpError.js";
import contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res, next) => {
  res.status(200).json(await contactsService.listContacts());
};

export const getOneContact = async (req, res) => {
  const contact = await contactsService.getContactById(req.params.id);
  contact
    ? res.status(200).json(contact)
    : res.status(404).json({ message: HttpError(404).message });
};

export const deleteContact = async (req, res) => {
  const contact = await contactsService.removeContact(req.params.id);
  contact
    ? res.status(200).json(contact)
    : res.status(404).json({ message: HttpError(404).message });
};

export const createContact = async ({ body: { name, email, phone } }, res) => {
  const contact = await contactsService.addContact(name, email, phone);
  res.status(201).json(contact);
};

export const updateContact = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "Body must have at least one field" });
    return;
  }
  const contact = await contactsService.updateContact(req.params.id, req.body);
  contact
    ? res.status(200).json(contact)
    : res.status(404).json({ message: HttpError(404).message });
};
