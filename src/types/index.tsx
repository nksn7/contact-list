import { SetStateAction } from "react";

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRegister {
  name: string;
  email: string;
  password: string;
  phone: string;
  dateRegister: string;
}

export interface INewContact {
  name: string;
  email: string;
  phone: string;
  dateRegister: string;
}

export interface INewUser {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface Ilogin {
  email: string;
  password: string;
}

export interface IContactRES {
  _id: string;
  name: string;
  email: string;
  phone: string;
  dateRegister: string;
}
