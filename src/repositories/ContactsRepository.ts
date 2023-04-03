import Contact from "@/models/Contact";

const mockedContacts: Contact[] = [
  {
    _id: 1,
    name: "Contato 1",
    email: "isaque@mail.com",
    phone: "432423",
  },
  {
    _id: 2,
    name: "Contato 2",
    email: "maria@mail.com",
    phone: "12131",
  },
  {
    _id: 3,
    name: "Contato 3",
    email: "any@mail.com",
    phone: "543342",
  },
];

class ContactsRepository {
  contacts: Contact[];

  constructor(contacts: Contact[] = mockedContacts) {
    this.contacts = contacts;
  }

  getContacts(): Contact[] {
    return this.contacts;
  }

  getContact(contactId: Number): Contact | void {
    return this.contacts.find(({ _id }) => _id === contactId);
  }

  saveContact(contact: Contact): Contact {
    this.contacts.push(contact);
    return contact;
  }

  updateContact(contact: Contact): Contact[] {
    this.contacts = this.contacts.map(({ _id, ...remaining }) => {
      if (_id === contact._id) {
        return contact;
      }

      return { _id, ...remaining };
    });

    return this.contacts;
  }

  deleteContact(contactId: Number): Contact[] {
    this.contacts = this.contacts.filter(({ _id }) => _id !== contactId);
    return this.contacts;
  }
}

let instance: ContactsRepository;

const Singleton = (function () {
  function createInstance() {
    console.log("createInstance");
    return new ContactsRepository();
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

export default Singleton.getInstance();
