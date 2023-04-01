// import express from "express";
// import { Sequelize, Model, DataTypes } from "sequelize";
const express = require("express");
const cors = require("cors");
const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize("postgres://postgres:nikson123@localhost:5432/projeto_m6");

class Contact extends Model {}
Contact.init(
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
  },
  { sequelize, modelName: "contact" }
);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/contacts", async (req, res) => {
  console.log("chegou aqui");
  const contacts = await Contact.findAll();
  res.json(contacts);
});

app.get("/contacts/:id", async (req, res) => {
  const contact = await Contact.findByPk(req.params.id);
  res.json(contact);
});

app.post("/contacts", async (req, res) => {
  const { name, email, phone } = req.body;
  const contact = await Contact.create({ name, email, phone });
  res.json(contact);
});

app.put("/contacts/:id", async (req, res) => {
  const { name, email, phone } = req.body;
  const contact = await Contact.findByPk(req.params.id);
  contact.name = name;
  contact.email = email;
  contact.phone = phone;
  await contact.save();
  res.json(contact);
});

app.delete("/contacts/:id", async (req, res) => {
  const contact = await Contact.findByPk(req.params.id);
  await contact.destroy();
  res.json({ message: "Contact excluído com sucesso" });
});

app.listen(3000, () => {
  console.log("API iniciada na porta 3000");
});
