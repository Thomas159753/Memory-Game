import { useEffect, useState } from "react"
import styles from './styles/main.module.css'

export default function Body ({score, setScore, highScore, setHighScore, pokemon, setPokemon}){

    const [trackingArray, setTrackingArray] = useState([])

    useEffect(() => {
        const promises = [];
        for (let index = 1; index <= 10; index++){
            const url = `https://pokeapi.co/api/v2/pokemon/${index}`;
            promises.push(fetch(url).then((res) => res.json()));
        }
        Promise.all(promises).then((results) => {
            const pokemon = results.map((result) => ({
                name: result.name.toUpperCase(),
                image: result.sprites['front_default'],
                id: result.id
            }));
            setPokemon(pokemon)
        });
    }, []);

    function handleCardClick(id){
        if(trackingArray.includes(Number(id))){
            if(score > highScore){
                setHighScore(score)
            }
            setTrackingArray([])
            setScore(0)
        }else{
            setTrackingArray((prev)=>[...prev,Number(id)])
            setScore((score) => score + 1);
        }
        shuffle(pokemon)
    }

    function shuffle(array) {
        let currentIndex = array.length;
        let newArray = [...array];

        while (currentIndex !== 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [newArray[currentIndex], newArray[randomIndex]] = [
                newArray[randomIndex], newArray[currentIndex]];
        }
        setPokemon(newArray);
    }

    return (
        <>
            <section className={styles.score}>
                <p>Current Score: {score}</p>
                <p>High Score: {highScore}</p>
            </section>
            <section>
                <ul>
                    {pokemon && pokemon.map((poke) => (
                        <li key={poke.id} onClick={() => handleCardClick(poke.id)}>
                            <img src={poke.image} alt={poke.name} />
                            <h2>{poke.name}</h2>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}