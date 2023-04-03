import ContactsRepository from '@/repositories/ContactsRepository'


const contactsRepository = ContactsRepository


export default function handler(req, res) {
    switch (req.method) {
        case 'GET':
            res.status(200).json(contactsRepository.getContacts())
            break;

        case 'POST':
            console.log(req.body)

            const {
                name,
                email,
                phone,
            } = req.body

            contactsRepository.saveContact({
                _id: Math.floor(Math.random() * 100),
                name,
                email,
                phone,
            })

            res.status(201).json(contactsRepository.getContacts())
            break;

        default:
            res.status(405).end(`${method} Not Allowed`);
            break;
    }
}