import './App.css';
import axios from 'axios';
import {useState} from "react";
import world_map from "./assets/world_map.png"


function App() {
    const [worldMap, setWorldMap] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    async function countriesData() {
        toggleLoading(true)
        try {
            const result = await
                axios.get(`https://restcountries.com/v3.1/all?fields=name,flags,population`);
            console.log(result.data);
            setWorldMap(result.data);
        } catch (error) {
            console.error(error)
            toggleError(true)
        } finally {
            toggleLoading(false);
        }

    }

    return (
        <>
            <div>
                <img src={world_map} alt="world map"/>
            </div>
            <button type="button" onClick={countriesData} disabled={loading === true}>Haal landen op</button>
            {error && <p className="error-message">Er is iets misgegaan. Probeer het nog eens.</p>}
            {loading && <p className="loading-message">De pagina is loading</p>}

            <ul>
            {worldMap.map((country) => {
                return <li key={country?.name?.common}>
                    <p>{country?.name?.common}</p>
                    <img src={country?.flags?.png} alt={country?.flags?.alt}/>
                    <p>{ `Has a population of ${country?.population} people` }</p>
                </li>

                }

            )}
            </ul>




        </>
    )
}

export default App;
