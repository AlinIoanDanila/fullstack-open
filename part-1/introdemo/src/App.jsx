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
    <>
      <StatisticLine text="good" value={stats.good} />
      <StatisticLine text="neutral" value={stats.neutral} />
      <StatisticLine text="bad" value={stats.bad} />
      <StatisticLine text="all" value={stats.all} />
      <StatisticLine text="average" value={stats.average} />
      <StatisticLine text="positive" value={stats.positive} />
    </>
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
      [statusType]: stats[statusType] + 1,
      all: stats.all + 1,
    };
    let average = (newStats.good - newStats.bad) / newStats.all;
    let positive = (newStats.good / newStats.all) * 100;

    setStats({ ...newStats, average, positive });
  };

  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selectedAnectode, setSelectedAnectode] = useState(
    // Math.floor(Math.random() * anecdotes.length)
    0
  );

  const createVotesObject = (anecdotes) =>
    Object.fromEntries(anecdotes.map((_, i) => [i, 0]));

  const [anecdoteVotes, setAnecdoteVotes] = useState(
    createVotesObject(anecdotes)
  );

  const handleNextAnecdote = () => {
    let randomAnecdoteID = Math.floor(Math.random() * anecdotes.length);
    while (randomAnecdoteID === selectedAnectode) {
      randomAnecdoteID = Math.floor(Math.random() * anecdotes.length);
    }
    setSelectedAnectode(randomAnecdoteID);
  };

  const handleVote = () => {
    setAnecdoteVotes({
      ...anecdoteVotes,
      [selectedAnectode]: anecdoteVotes[selectedAnectode] + 1,
    });
  };

  const getAnecdoteOfTheDay = (anecdoteVotes) => {
    let maxVotes = 0;
    let maxIndex = 0;
    for (const key in anecdoteVotes) {
      if (anecdoteVotes[key] > maxVotes) {
        maxVotes = anecdoteVotes[key];
        maxIndex = key;
      }
    }

    return anecdotes[maxIndex];
  };

  return (
    <div>
      <div>
        <h2>Anecdote of the day</h2>
        {anecdotes[selectedAnectode]}
        <p>has {anecdoteVotes[selectedAnectode]} votes</p>
        <button onClick={handleVote}>vote</button>
        <button onClick={handleNextAnecdote}>next anecdote</button>
        <h3>Anecdote with most votes</h3>
        <p>{getAnecdoteOfTheDay(anecdoteVotes)}</p>
      </div>
      <h1>Give feedback</h1>
      <Button text={"good"} handleClick={() => updateStats("good")} />
      <Button text={"neutral"} handleClick={() => updateStats("neutral")} />
      <Button text={"bad"} handleClick={() => updateStats("bad")} />
      <h2>Statistics</h2>
      <Statistics stats={stats} />
    </div>
  );
};

export default App;
