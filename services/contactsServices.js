import Contact from "../db/models/Contact.js";

async function listContacts(userId) {
  return await Contact.findAll({ where: { owner: userId } });
}

async function getContactById({ contactId, userId }) {
  return Contact.findOne({ where: { id: contactId, owner: userId } });
}

async function deleteContact({ contactId, userId }) {
  const contact = await getContactById({ contactId, userId });
  if (!contact) {
    return null;
  }
  await contact.destroy();
  return contact;
}

async function createContact({ data, userId }) {
  return Contact.create({ ...data, owner: userId });
}

async function updateContact({ contactId, data, userId }) {
  const [count, updatedRows] = await Contact.update(data, {
    where: { id: contactId, owner: userId },
    returning: true,
  });
  if (!count) {
    return null;
  }
  const [updatedContact] = updatedRows;
  return updatedContact;
}

async function updateStatusContact({ contactId, data, userId }) {
  const [count, updatedRows] = await Contact.update(data, {
    where: { id: contactId, owner: userId },
    returning: true,
  });
  if (!count) {
    return null;
  }
  const [updatedContact] = updatedRows;
  return updatedContact;
}

export default {
  listContacts,
  getContactById,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
};
