import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [pokemonCards, setPokemonCards] = useState([]); // Pokemon Data
  const [score, setScore] = useState(0); // Score
  const [bestScore, setBestScore] = useState(0); // Best Score
  const [clickedCards, setClickedCards] = useState([]); // Clicked Cards

  const fetchPokemonData = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=12");
    const data = await response.json();

    const pokemonDetails = await Promise.all(
      data.results.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const details = await response.json();
        return {
          name: details.name,
          image: details.sprites.front_default,
        };
      })
    );
    return pokemonDetails;
  };

  useEffect(() => {
    const loadPokemon = async () => {
      const pokemon = await fetchPokemonData();
      setPokemonCards(pokemon);
    };
    loadPokemon();
  }, []);

  const handleCardClick = (pokemonName) => {
    setScore((prevScore) => {
      if (clickedCards.includes(pokemonName)) {
        // Game over logic
        setClickedCards([]); // Reset clicked cards
        return 0; // Reset score
      } else {
        // Update score and clicked cards
        setClickedCards((prevClickedCards) => [
          ...prevClickedCards,
          pokemonName,
        ]);

        // Shuffle the cards for a new order
        setPokemonCards((prevPokemonCards) => shuffleArray([...prevPokemonCards]));
        return prevScore + 1;
      }
    });

    // Update best score outside the setScore function
    setBestScore((prevBestScore) => {
      return score + 1 > prevBestScore ? score + 1 : prevBestScore;
    });
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Pokemon Memory Game</h1>
        <p className="description">
          Get points by clicking on an image but don't click on any more than
          once!
        </p>
        <div className="scoreboard">
          <h2>Score: {score}</h2>
          <h2>Best Score: {bestScore}</h2>
        </div>
      </header>
      <div className="cards-container">
        {pokemonCards.map((pokemon, index) => (
          <Card
            key={index}
            name={pokemon.name}
            image={pokemon.image}
            onCardClick={() => handleCardClick(pokemon.name)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
