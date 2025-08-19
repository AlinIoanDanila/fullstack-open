import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <p>
      {text} {value} {text === "positive" ? "%" : ""}
    </p>
  );
};

const Statistics = ({ stats }) => {
  if (stats.all < 1) {
    return <div>No feedback given</div>;
  }

  return (
    <table>
      <StatisticLine text="good" value={stats.good} />
      <StatisticLine text="neutral" value={stats.neutral} />
      <StatisticLine text="bad" value={stats.bad} />
      <StatisticLine text="all" value={stats.all} />
      <StatisticLine text="average" value={stats.average} />
      <StatisticLine text="positive" value={stats.positive} />
    </table>
  );
};

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const [stats, setStats] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0,
    average: 0,
    positive: 0,
  });

  const updateStats = (statusType) => {
    const newStats = {
      ...stats,
      [`${statusType}`]: stats[statusType] + 1,
      all: stats.all + 1,
    };
    let average = (newStats.good - newStats.bad) / newStats.all;
    let positive = (newStats.good / newStats.all) * 100;

    setStats({ ...newStats, average, positive });
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text={"good"} handleClick={() => updateStats("good")} />
      <Button text={"neutral"} handleClick={() => updateStats("neutral")} />
      <Button text={"bad"} handleClick={() => updateStats("bad")} />
      {/* <button onClick={() => updateStats("neutral")}>neutral</button>
      <button onClick={() => updateStats("bad")}>bad</button> */}
      <h2>Statistics</h2>
      <Statistics stats={stats} />
    </div>
  );
};

export default App;
