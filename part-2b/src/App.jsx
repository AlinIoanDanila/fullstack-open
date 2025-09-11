import { useState, useEffect, useRef } from "react";

import personService from "./services/persons";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({
    name: "",
    number: "",
  });
  const [nameFilter, setNameFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [notificationType, setNotificationType] = useState(null);

  const inputNameRef = useRef();

  useEffect(() => {
    personService.getAll().then((data) => setPersons(data));
  }, []);

  const handlePersonChange = (e) => {
    setNewPerson((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFilterChange = (e) => {
    setNameFilter(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let newPersonIndex = persons.findIndex(
      (person) => person.name === newPerson.name
    );

    debugger;

    if (newPersonIndex < 0) {
      personService
        .createPerson(newPerson)
        .then((res) => {
          setPersons((prev) => [...prev, res]);
          setNotificationType({
            message: `Added ${newPerson.name}`,
            type: "succesful",
          });
          setTimeout(() => setNotificationType(null), 2000);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setNewPerson({ name: "", number: "" });
        });
      return;
    }

    let isPersonBeingUpdated = confirm(
      `${newPerson.name} is already added, replace the old number with a new one?`
    );
    if (!isPersonBeingUpdated) return;

    personService
      .patchPerson(persons[newPersonIndex].id, newPerson)
      .then((res) => {
        setPersons((prevPersons) =>
          prevPersons.map((person) =>
            person.id === persons[newPersonIndex].id ? res : person
          )
        );
        setNotificationType({
          message: `Updated ${newPerson.name}`,
          type: "succesful",
        });
        setTimeout(() => setNotificationType(null), 2000);
      })
      .catch((error) => {
        if (error.status === 404) {
          setNotificationType({
            message: `Information of ${newPerson.name} has been deleted from the server`,
            type: "error",
          });
          setTimeout(() => setNotificationType(null), 3000);
        }
      });

    inputNameRef.current.focus();
    return;
  };

  const handlePersonDelete = (id) => {
    personService
      .deletePerson(id)
      .then((res) => {
        const updatedPersonList = persons.filter((person) => person.id !== id);
        setPersons(updatedPersonList);
        setNotificationType({
          message: `Deleted ${res.name}`,
          type: "succesful",
        });
        setTimeout(() => setNotificationType(null), 2000);
      })
      .catch((error) => console.log(error));
  };

  const filterByName = () => {
    if (nameFilter === "") {
      setFilteredPersons([]);
      return;
    }

    const newFilteredPersons = persons.filter((person) =>
      person.name.toLocaleLowerCase().includes(nameFilter)
    );
    setFilteredPersons(newFilteredPersons);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notificationType={notificationType} />

      <Filter
        handleFilterChange={handleFilterChange}
        filterByName={filterByName}
      />

      <PersonForm
        newPerson={newPerson}
        onChange={handlePersonChange}
        onSubmit={handleSubmit}
        inputNameRef={inputNameRef}
      />

      <PersonList
        persons={persons}
        filteredPersons={filteredPersons}
        handlePersonDelete={handlePersonDelete}
      />
    </div>
  );
};

export default App;
