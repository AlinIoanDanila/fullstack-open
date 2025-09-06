const Filter = ({ handleFilterChange, filterByName }) => {
  return (
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
  );
};

export default Filter;
