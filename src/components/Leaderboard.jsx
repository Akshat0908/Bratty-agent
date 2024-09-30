import React, { useState, useEffect } from 'react';
import BrattyScoreBoard from '../contracts/BrattyScoreBoard';

const Leaderboard = ({ web3, account }) => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      if (web3 && account) {
        const contract = new web3.eth.Contract(BrattyScoreBoard.abi, BrattyScoreBoard.address);
        const result = await contract.methods.getTopPlayers(5).call();
        const fetchedScores = result[0].map((address, index) => ({
          address,
          score: result[1][index]
        }));
        setScores(fetchedScores);
      }
    };

    fetchScores();
  }, [web3, account]);

  return (
    <div className="leaderboard">
      <h2>Brattiest Users Leaderboard</h2>
      <ul>
        {scores.map((entry, index) => (
          <li key={index}>
            {entry.address === account ? <strong>{entry.address}</strong> : entry.address}: {entry.score} points
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;