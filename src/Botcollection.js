import React, { useState, useEffect } from "react";
import YourbotArmy from "./YourbotArmy";

export default function Botcollection() {
  const [bots, setBots] = useState([]);
  const [army, setArmy] = useState([]);

  const handleEnlistBot = (bot) => {
    if (!army.includes(bot)) {
      setArmy([...army, bot]);
    }
  };

  function handleDeleteclick(botId) {
    fetch(`https://backend-tau-eight-31.vercel.app/bots/${botId}`, {
      method: "Delete",
    })
      .then((response) => response.json())
      .then(() => {
        setArmy(army.filter((bot) => bot.id !== botId));
        setBots(bots.filter((bot) => bot.id !== botId));
      })
      .catch((error) => {
        console.log("Error deleting bot:", error);
      });
  }

  function handleRemove(botId) {
    const updateArmy = army.filter((bot) => bot.id !== botId);
    setArmy(updateArmy);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://backend-tau-eight-31.vercel.app/bots");
        const data = await response.json();
        setBots(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <YourbotArmy army={army} handleRemove={handleRemove} />
      <h2 className="h2">Bot collection</h2>
      {bots.length === 0 ? (
        <p>bots loading...</p>
      ) : (
        <ul className="bot-list">
            
          {bots.map((bot) => (
            <li key={bot.id}>
              <h3>{bot.name}</h3>
              <p>health:{bot.health}</p>
              <p>Damage:{bot.damage}</p>
              <p>armor:{bot.armor}</p>
              <p>bot_class:{bot.bot_class}</p>
              <img src={bot.avatar_url} alt="" />
              <button onClick={() => handleEnlistBot(bot)}>Add to army</button>
              <button onClick={() => handleDeleteclick(bot.id)}>X</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
