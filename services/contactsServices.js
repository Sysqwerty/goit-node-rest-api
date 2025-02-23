import Contact from "../db/models/Contact.js";

export async function listContacts(userId) {
  return await Contact.findAll({ where: { owner: userId } });
}

export async function getContactById({ contactId, userId }) {
  return Contact.findOne({ where: { id: contactId, owner: userId } });
}

export async function deleteContact({ contactId, userId }) {
  const contact = await getContactById({ contactId, userId });
  if (!contact) {
    return null;
  }
  await contact.destroy();
  return contact;
}

export async function createContact({ data, userId }) {
  return Contact.create({ ...data, owner: userId });
}

export async function updateContact({ contactId, data, userId }) {
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

export async function updateStatusContact({ contactId, data, userId }) {
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
