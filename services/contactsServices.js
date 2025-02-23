import Contact from "../db/models/Contact.js";

export async function listContacts({ userId, query }) {
  const { favorite, limit = 100, page = 1 } = query;
  const contactsLimit = Number(limit) > 0 ? Number(limit) : 100;
  const contactsPage = Number(page) > 1 ? Number(page) : 1;
  const offset = (contactsPage - 1) * contactsLimit;

  const whereClause = { owner: userId };

  if (favorite !== undefined) {
    whereClause.favorite = favorite;
  }

  return await Contact.findAll({
    where: whereClause,
    limit: contactsLimit,
    offset,
    order: [["id", "ASC"]],
  });
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

export async function createContact({ body, userId }) {
  return Contact.create({ ...body, owner: userId });
}

export async function updateContact({ contactId, body, userId }) {
  const [count, updatedRows] = await Contact.update(body, {
    where: { id: contactId, owner: userId },
    returning: true,
  });
  if (!count) {
    return null;
  }

  const [updatedContact] = updatedRows;

  return updatedContact;
}

export async function updateStatusContact({ contactId, body, userId }) {
  const [count, updatedRows] = await Contact.update(body, {
    where: { id: contactId, owner: userId },
    returning: true,
  });

  if (!count) {
    return null;
  }

  const [updatedContact] = updatedRows;

  return updatedContact;
}
