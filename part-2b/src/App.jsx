import { useState, useEffect, useRef } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({});
  const [nameFilter, setNameFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);

  const inputNameRef = useRef();

  useEffect(() => {
    axios
      .get(`${baseUrl}/persons`)
      .then((response) => setPersons(response.data));
  }, []);

  const handlePersonChange = (e) => {
    setNewPerson((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      id: persons.length + 1,
    }));
  };

  const handleFilterChange = (e) => {
    setNameFilter(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (persons.findIndex((person) => person.name === newPerson.name) !== -1) {
      alert(`${newPerson.name} is already added`);
      inputNameRef.current.focus();
      return;
    }

    axios
      .post(`${baseUrl}/persons`, newPerson)
      .then(() => setPersons((prev) => [...prev, newPerson]));
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
      <div style={{ display: "flex", alignItems: "center" }}>
        <p>filter by name:</p>
        <input
          style={{ height: 20 }}
          name="filter"
          type="text"
          onChange={handleFilterChange}
        />
        <button onClick={filterByName}>Show</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          name:{" "}
          <input name="name" ref={inputNameRef} onChange={handlePersonChange} />
        </div>
        <div>
          number: <input name="number" onChange={handlePersonChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.length > 0
        ? filteredPersons.map((person) => (
            <div style={{ display: "flex", columnGap: "10px" }} key={person.id}>
              <p>{person.name}</p>
              <p>{person.number}</p>
            </div>
          ))
        : persons.map((person) => (
            <div style={{ display: "flex", columnGap: "10px" }} key={person.id}>
              <p>{person.name}</p>
              <p>{person.number}</p>
            </div>
          ))}
      {/* {persons.map((person) => (
        <div style={{ display: "flex", columnGap: "10px" }} key={person.id}>
          <p>{person.name}</p>
          <p>{person.number}</p>
        </div>
      ))} */}
    </div>
  );
};

export default App;
