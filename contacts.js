const fs = require('node:fs').promises;
const { nanoid } = require('nanoid');
const path = require('node:path');
require('colors');

const contactsPath = path.join(__dirname, 'db/contacts.json');

const listContacts = async () => {
	try {
		const contacts = await fs.readFile(contactsPath, 'utf8');
		const contactsList = await JSON.parse(contacts);
		return contactsList;
	} catch (err) {
		console.log(`Error Description>>> ${err.message}`.red);
	}
};

const getContactById = async contactId => {
	try {
		const contacts = await listContacts();
		const contactById = await contacts.find(
			contact => contact.id === contactId.toString()
		);
		return contactById;
	} catch (err) {
		console.log(`Error Description>>> ${err.message}`.red);
	}
};

const addContact = async (name, email, phone) => {
	try {
		const contacts = await listContacts();
		const newContact = {
			id: nanoid(),
			name: name,
			email: email,
			phone: phone,
		};

		const newContactsList = [...contacts, newContact];
		await fs.writeFile(contactsPath, JSON.stringify(newContactsList, null, 2));
		return newContact;
	} catch (err) {
		console.log(`Error Description>>> ${err.message}`.red);
	}
};

const removeContact = async contactId => {
	try {
		const contacts = await listContacts();
		const newContactsList = await contacts.filter(
			contact => contact.id !== contactId
		);
		await fs.writeFile(
			contactsPath,
			JSON.stringify(newContactsList, null, 2),
			'utf8'
		);
		console.log(
			`Deleted contact with the given Id:\n>>> ${contactId} <<<`.black.bgCyan
		);
		return newContactsList;
	} catch (err) {
		console.log(`Error Description>>> ${err.message}`.red);
	}
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
