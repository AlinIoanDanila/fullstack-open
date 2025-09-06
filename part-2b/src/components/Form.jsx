const Form = ({
  handleSubmit,
  inputNameRef,
  newPerson,
  handlePersonChange,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:
        <input
          name="name"
          ref={inputNameRef}
          value={newPerson.name}
          onChange={handlePersonChange}
        />
      </div>
      <div>
        number:
        <input
          name="number"
          value={newPerson.number}
          onChange={handlePersonChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Form;
