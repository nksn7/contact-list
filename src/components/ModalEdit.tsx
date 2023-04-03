import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { INewContact, IContactRES } from "@/types";
import { useState, Dispatch, SetStateAction } from "react";
import api from "@/server/api";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Contact from "@/models/Contact";

interface ModalformEditProps {
  contact: Contact;
  contacts: IContactRES[];
  setContacts: Dispatch<SetStateAction<never[]>> | any;
}

const ModalformEdit = ({ contact, contacts, setContacts }: ModalformEditProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const formSchema = yup.object().shape({
    name: yup.string().required("Nome completo obrigatório."),
    email: yup.string().email("Deve ser um e-mail.").required("E-mail obrigatório."),
    phone: yup.number().required("Phone obrigatório."),
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const emailError = email === "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewContact>({ resolver: yupResolver(formSchema) });

  const editFormSubmit = async (formData: INewContact) => {
    try {
      const { data } = await api.patch(`contacts/${contact._id}`, formData);
      console.log("data", data)
      setContacts(data);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Button onClick={onOpen} size="sm" fontSize="small" colorScheme="yellow" mr="2">
        Editar
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Preencha os dados a serem atualizados</ModalHeader>
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Nome</FormLabel>
              <Input
                required
                {...register("name")}
                defaultValue={contact.name}
                type="name"
                onChange={(e) => setName(e.target.value)}
              />
              {!name ? (
                <FormHelperText>Digite seu nome.</FormHelperText>
              ) : (
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={emailError}>
              <FormLabel>E-mail</FormLabel>
              <Input
                required
                defaultValue={contact.email}
                type="email"
                {...register("email")}
                onChange={(e) => setEmail(e.target.value)}
              />
              {!emailError ? (
                <FormHelperText>Digite seu e-mail</FormHelperText>
              ) : (
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Telefone</FormLabel>
              <Input
                required
                defaultValue={contact.phone}
                {...register("phone")}
                type="phone"
                onChange={(e) => setPhone(e.target.value)}
              />
              {!phone ? (
                <FormHelperText>Digite seu telefone.</FormHelperText>
              ) : (
                <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              size="sm"
              fontSize="small"
              colorScheme="green"
              mr="2"
              onClick={handleSubmit(editFormSubmit)}
            >
              Atualizar
            </Button>
            <Button size="sm" fontSize="small" mr="2" onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalformEdit;
