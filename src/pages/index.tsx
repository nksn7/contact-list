import { useState, useEffect } from "react";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  VStack,
  useToast,
} from "@chakra-ui/react";
import api from "@/server/api";
import * as yup from "yup";
import Header from "@/components/Header";
import { useForm } from "react-hook-form";
import { IContactRES, INewContact } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import ModalformEdit from "@/components/ModalEdit";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  // const [id, setId] = useState(null);
  const [contacts, setContacts] = useState<any>([]);
  // const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const formSchema = yup.object().shape({
    name: yup.string().required("Nome completo obrigatório."),
    email: yup.string().email("Deve ser um e-mail.").required("E-mail obrigatório."),
    phone: yup.number().required("Phone obrigatório."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewContact>({ resolver: yupResolver(formSchema) });

  const formCreateContact = async (formData: INewContact) => {
    // setContacts([
    //   { phone: 892378132, email: "nik@nik.com", name: "nikson" },
    //   { phone: 2313123, email: "joão@joão.com", name: "joãoson" },
    // ]);
    // console.log(formData);
    try {
      setIsLoading(true);
      const response = await api.post("/contacts", formData);
      setContacts(contacts.concat(response.data));
      console.log(contacts);
      toast({
        title: "Cadastrado com sucesso!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const deleteContact = async (_id: any) => {
    try {
      await api.delete(`/contacts/${_id}`);
      toast({
        title: "Deletado com sucesso!!",
        status: "info",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {});

  return (
    <Box>
      <Header headerName="Cadastro de Contatos" />
      <Flex align="center" justifyContent="center">
        <Box width={850} borderWidth={1} borderRadius={8} boxShadow="lg" p={20} mt="25">
          <VStack as="form">
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input
                required
                type="name"
                placeholder="Digite seu nome completo."
                {...register("name")}
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              {!name ? (
                <FormHelperText>Digite seu nome completo</FormHelperText>
              ) : (
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>E-mail</FormLabel>
              <Input
                required
                type="email"
                placeholder="Digite seu e-mail."
                {...register("email")}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              {!email ? (
                <FormHelperText>Digite seu e-mail</FormHelperText>
              ) : (
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Telefone</FormLabel>
              <Input
                required
                type="phone"
                placeholder="Digite seu telefone"
                {...register("phone")}
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
              {!phone ? (
                <FormHelperText>Digite seu telefone</FormHelperText>
              ) : (
                <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
              )}
            </FormControl>

            <Button
              colorScheme="green"
              type="submit"
              mt={6}
              isLoading={isLoading}
              onClick={handleSubmit(formCreateContact)}
            >
              Cadastrar
            </Button>
          </VStack>

          <Table variant="simple" mt={6}>
            <Thead bg="teal.500">
              <Tr>
                <Th textColor="white">Nome</Th>
                <Th textColor="white">E-mail</Th>
                <Th textColor="white">Telefone</Th>
                <Th textColor="white">Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* <Tr>
                <Td>nikson</Td>
                <Td>nikson@mail.com</Td>
                <Td>982389712</Td>
                <Td justifyContent="space-between">
                  <Flex>
                    <ModalformEdit id={1} contacts={contacts} setContacts={setContacts} />
                    <Button
                      size="sm"
                      fontSize="small"
                      colorScheme="red"
                      mr="2"
                      onClick={() => deleteContact(contact._id)}
                    >
                      Remover
                    </Button>
                  </Flex>
                </Td>
              </Tr> */}
              {contacts.map((contact: IContactRES, index: any) => (
                <Tr key={index}>
                  <Td>{contact.name}</Td>
                  <Td>{contact.email}</Td>
                  <Td>{contact.phone}</Td>
                  <Td justifyContent="space-between">
                    <Flex>
                      <ModalformEdit
                        id={contact._id}
                        contacts={contacts}
                        setContacts={setContacts}
                      />
                      <Button
                        size="sm"
                        fontSize="small"
                        colorScheme="red"
                        mr="2"
                        onClick={() => deleteContact(contact._id)}
                      >
                        Remover
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </Box>
  );
}
