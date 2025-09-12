import cors from "cors";
import morgan from "morgan";
import express from "express";

const app = express();

app.use(cors());
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens.method(req, res) === "POST" ? JSON.stringify(req.body) : "",
    ].join(" ");
  })
);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(express.json());

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (req, res) => {
  return res.send(`
    <!DOCTYPE html>
    <html>
      <head><title>Hello</title></head>
      <body>
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date().toString()}</p>
      </body>
    </html>
  `);
});

app.get("/api/persons", (req, res) => {
  return res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const { id } = req.params;
  let person = persons.find((person) => person.id === id.toString());

  if (!person) {
    return res.status(404).end();
  }

  return res.json(person);
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  if (!name || !number)
    return res
      .status(400)
      .json({ error: "Missing required fields", fields: ["name", "number"] });

  if (persons.find((person) => person.name === name))
    return res
      .status(409)
      .json({ error: "Conflict", message: `Name ${name} already exists` });

  const newPerson = {
    id: Math.floor(Math.random() * 1000).toString(),
    name: req.body.name,
    number: req.body.number,
  };

  persons.push(newPerson);
  return res.json(newPerson).status(201).end();
});

app.delete("/api/persons/:id", (req, res) => {
  const { id } = req.params;
  persons = persons.filter((person) => person.id !== id.toString());

  return res.status(204).end();
});

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
