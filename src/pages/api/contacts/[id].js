import ContactsRepository from '@/repositories/ContactsRepository'


const contactsRepository = ContactsRepository


export default function handler(req, res) {
    const { id: contactId } = req.query;
    const catactIntId = parseInt(contactId, 10)


    switch (req.method) {
        case 'GET':
            res.status(200).json(contactsRepository.getContact(catactIntId))
            break;

        case 'DELETE':
            res.status(200).json(contactsRepository.deleteContact(catactIntId))
            break;

        case 'PATCH':
            const {
                name,
                email,
                phone,
            } = req.body


            res.status(200).json(contactsRepository.updateContact({
                _id: catactIntId,
                name,
                email,
                phone,
            }))
            break;

        default:
            res.status(405).end(`${method} Not Allowed`);
            break;
    }
}