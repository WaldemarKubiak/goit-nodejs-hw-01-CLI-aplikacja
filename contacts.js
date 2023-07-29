const fs = require('node:fs').promises;
const path = require('node:path');

// const dirname = __dirname;
// console.log(dirname);

// const contactsPath = path.resolve(__dirname, 'db/contacts.json');
// console.log('AbsolutePath:', contactsPath);

const contactsPath = path.join(__dirname, 'db/contacts.json');
console.log('AbsolutePath:', contactsPath);

// TODO: udokumentuj każdą funkcję
function listContacts() {
	// ...twój kod
	fs.readFile(contactsPath)
		.then(data => console.log(data.toString()))
		.catch(err => console.log(err.message));
}

function getContactById(contactId) {
	// ...twój kod
}

function removeContact(contactId) {
	// ...twój kod
}

function addContact(name, email, phone) {
	// ...twój kod
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
