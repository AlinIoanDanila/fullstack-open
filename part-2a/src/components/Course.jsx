import Header from "./Header";

const CourseView = ({ details }) => {
  const sumOfExercises = details.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <>
      <Header text={details.name} />
      {details.parts.map((part) => (
        <div style={{ display: "flex", columnGap: "10px" }} key={part.id}>
          <p>{part.name}</p>
          <p>{part.exercises}</p>
        </div>
      ))}
      <p style={{ fontWeight: "bold" }}>total of {sumOfExercises} exercises</p>
    </>
  );
};

export default CourseView;
