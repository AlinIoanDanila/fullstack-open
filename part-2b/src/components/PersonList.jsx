import Person from "./Person";

const PersonList = ({ persons, filteredPersons, handlePersonDelete }) => {
  return (
    <>
      <h2>Numbers</h2>
      {filteredPersons.length > 0
        ? filteredPersons.map((person) => (
            <Person
              key={person.id}
              person={person}
              handleDelete={handlePersonDelete}
            />
          ))
        : persons.map((person) => (
            <Person
              key={person.id}
              person={person}
              handleDelete={handlePersonDelete}
            />
          ))}
    </>
  );
};

export default PersonList;
