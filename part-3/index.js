import "dotenv/config";
import morgan from "morgan";
import express from "express";
import Person from "./models/Person.js";

const app = express();
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};
const PORT = process.env.PORT || 3001;

app.use(express.static("dist"));
app.use(express.json());
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

app.get("/api/info", async (req, res, next) => {
  try {
    const length = await Person.countDocuments();

    return res.send(`
    <!DOCTYPE html>
    <html>
      <head><title>Hello</title></head>
      <body>
        <p>Phonebook has info for ${length} people</p>
        <p>${new Date().toString()}</p>
      </body>
    </html>
  `);
  } catch (error) {
    return next(error);
  }
});

app.get("/api/persons", async (req, res, next) => {
  try {
    return await Person.find({}).then((persons) => res.json(persons));
  } catch (error) {
    return next(error);
  }
});

app.get("/api/persons/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    let person = await Person.findById(id);

    if (!person) {
      return res.status(404).end();
    }
    return res.json(person);
  } catch (error) {
    return next(error);
  }
});

app.post("/api/persons", async (req, res, next) => {
  try {
    if (!req.body) {
      return next("Invalid body");
    }
    const { name, number } = req.body;
    if (!name || !number) return res.status(400).json({ error: "Missing required fields", fields: ["name", "number"] });

    let isPersonAdded = (await Person.find({ name: name })).length ? true : false;

    if (isPersonAdded) return res.status(409).json({ error: "Conflict", message: `Name ${name} already exists` });

    const newPerson = {
      name: req.body.name,
      number: req.body.number,
    };

    return await Person.insertOne(newPerson).then((response) => res.json(response));
  } catch (error) {
    return next(error);
  }
});

app.delete("/api/persons/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    return await Person.findByIdAndDelete(id).then((response) => res.send(response).status(204).end());
  } catch (error) {
    return next(error);
  }
});

app.use(unknownEndpoint);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
