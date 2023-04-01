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
  VStack,
  useToast,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import api from "@/server/api";
import * as yup from "yup";
import Header from "@/components/Header";
import { useForm } from "react-hook-form";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { IContactRES, INewUser } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUsers] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const formSchema = yup.object().shape({
    name: yup.string().required("Nome completo obrigatório."),
    email: yup.string().email("Deve ser um e-mail.").required("E-mail obrigatório."),
    password: yup.string().required("Senha obrigatório."),
    phone: yup.number().required("Telefone obrigatório."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewUser>({ resolver: yupResolver(formSchema) });

  const formCreateUser = async (formData: INewUser) => {
    try {
      setIsLoading(true);
      const response = await api.post("/register", formData);
      setUsers(user.concat(response.data));
      console.log(user);
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

  useEffect(() => {});

  return (
    <Box>
      <Header headerName="Cadastro de Usuários" />
      <Flex align="center" justifyContent="center">
        <Box width={450} borderWidth={1} borderRadius={8} boxShadow="lg" p={30} mt="25" mb="25">
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
              <FormLabel>Senha</FormLabel>
              <InputGroup>
                <Input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite seu telefone"
                  {...register("password")}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <InputRightElement>
                  <Button
                    variant={"ghost"}
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {!password ? (
                <FormHelperText>Digite sua senha</FormHelperText>
              ) : (
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
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
              onClick={handleSubmit(formCreateUser)}
            >
              Criar Usuário
            </Button>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
}
