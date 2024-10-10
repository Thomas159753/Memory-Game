import { useState } from 'react';
import Body from './components/Body.jsx';

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [pokemon, setPokemon] = useState();
  
  return (
    <>
      <header>Poke Memory Game</header>
      <main>
        <Body
          score={score}
          setScore={setScore}
          highScore={highScore}
          setHighScore={setHighScore}
          pokemon={pokemon}
          setPokemon={setPokemon}
        />
      </main>
      <footer>
        <p>
          <a href='https://github.com/Thomas159753'>By Thomas</a>
        </p>
      </footer>
    </>
  );
}

export default App;
