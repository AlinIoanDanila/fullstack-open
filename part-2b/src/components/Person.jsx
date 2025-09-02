const Person = ({ person, handleDelete }) => {
  return (
    <div style={{ display: "flex", columnGap: "10px" }}>
      <p>{person.name}</p>
      <p>{person.number}</p>
      <button onClick={() => handleDelete(person.id)}>Delete</button>
    </div>
  );
};

export default Person;
