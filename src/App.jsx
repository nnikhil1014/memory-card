import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [pokemonCards, setPokemonCards] = useState([]); // Pokemon Data
  const [score, setScore] = useState(0); // Score
  const [bestScore, setBestScore] = useState(0); // Best Score
  const [clickedCards, setClickedCards] = useState([]); // Clicked Cards

  const fetchGiphyData = async () => {
    const response = await fetch(
      "https://api.giphy.com/v2/emoji?api_key=taqZ5fHyD3qeoMO5U6vE3D2kyGwT50o2&limit=12&offset=0"
    );
    const data = await response.json();
  
    // Ensure data.data is iterable
    return data.data.map((item) => ({
      id: item.id,
      image: item.images.fixed_width_small.url, // Example image property
    }));
  };
  

  // const fetchPokemonData = async () => {
  //   const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=12");
  //   const data = await response.json();

  //   const pokemonDetails = await Promise.all(
  //     data.results.map(async (pokemon) => {
  //       const response = await fetch(pokemon.url);
  //       const details = await response.json();
  //       return {
  //         name: details.name,
  //         image: details.sprites.front_default,
  //       };
  //     })
  //   );
  //   return pokemonDetails;
  // };

  // useEffect(() => {
  //   const loadPokemon = async () => {
  //     const pokemon = await fetchPokemonData();
  //     setPokemonCards(pokemon);
  //   };
  //   loadPokemon();
  // }, []);

  useEffect(() => {
    const loadGiphy = async () => {
      const giphy = await fetchGiphyData();
      setPokemonCards(giphy);
    };
    loadGiphy();
  }, []);
  


  const handleCardClick = (giphyName) => {
    setScore((prevScore) => {
      if (clickedCards.includes(giphyName)) {
        // Game over logic
        setClickedCards([]); // Reset clicked cards
        return 0; // Reset score
      } else {
        // Update score and clicked cards
        setClickedCards((prevClickedCards) => [
          ...prevClickedCards,
          giphyName,
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
        <h1 className="title">Giphy Memory Game</h1>
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
        {pokemonCards.map((giphy, index) => (
          <Card
            key={index}
            name={giphy.id}
            image={giphy.image}
            onCardClick={() => handleCardClick(giphy.id)}
          />
        ))}
      </div>

    </div>
  );
}

export default App;
