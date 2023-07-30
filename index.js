const contacts = require('./contacts');

const { Command } = require('commander');
const program = new Command();
program
	.option('-a, --action <type>', 'choose action')
	.option('-i, --id <type>', 'user id')
	.option('-n, --name <type>', 'user name')
	.option('-e, --email <type>', 'user email')
	.option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

// TODO: refaktor
async function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case 'list':
			// console.time();
			const allContacts = await contacts.listContacts();
			console.table(allContacts);
			// console.timeEnd();

			break;

		case 'get':
			const getContactId = await contacts.getContactById(id);
			console.log(getContactId);
			break;

		case 'add':
			//... name email phone
			const addContact = await contacts.addContact(name, email, phone);
			console.log(addContact);
			break;

		case 'remove':
			// ... id
			const removeContact = await contacts.removeContact(id);
			console.table(removeContact);
			break;

		default:
			console.warn('\x1B[31m Unknown action type!');
	}
}

invokeAction(argv);

/*
// functions performance
	console.time();
	
		console.log(contacts);
					
	console.timeEnd();
*/
