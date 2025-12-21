import './App.css';
import axios from 'axios';
import {useState} from "react";
import world_map from "./assets/world_map.png"
import regionName from "./helpers/regionName.js";
import roundToMillions from "./helpers/roundToMillions.js";


function App() {
    const [worldMap, setWorldMap] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    // const [searchQuery, setSearchQuery] = useState("");
    const [countryFound, setCountryFound] = useState([]);

    async function countriesData() {
        toggleLoading(true)
        try {
            const result = await
                axios.get(`https://restcountries.com/v3.1/all?fields=name,flags,population,region`);
            console.log(result.data);
            setWorldMap(result.data);
        } catch (error) {
            console.error(error);
            toggleError(true);
        } finally {
            toggleLoading(false);
        }

    }

    // function HandleSubmit(event) {
    // event.preventDefault();

    async function countryInformation() {
        toggleLoading(true)
        try {
            const result = await
                axios.get(`https://restcountries.com/v3.1/name/the netherlands`);
            console.log(result.data);
            setCountryFound(result.data);
        } catch (error) {
            console.log(error);
            toggleError(true);
        } finally {
            toggleLoading(false);
        }
    }


    return (
        <>

            <header>
                <img src={world_map} alt="world map"/>
            </header>
            <h1>World Map</h1>
            <div className="button-class">
            </div>
            <button type="button" onClick={countriesData} disabled={loading === true}>Haal landen op</button>
            {error && <p className="error-message">Er is iets misgegaan. Probeer het nog eens opnieuw.</p>}
            {loading && <p className="loading-countries">De informatie wordt opgehaald</p>}


            <ul>
                {worldMap.length > 0 &&
                    worldMap.sort((a, b) => (a?.population || 0) - (b?.population || 0))
                        .map((country) => {
                            return (<li key={country?.name?.common}>
                                    <img src={country?.flags?.png} alt={country?.flags?.alt}/>
                                    <h2 className={regionName(country?.region)}>
                                        {country?.name?.common}
                                    </h2>
                                    <p>{`Has a population of ${country?.population} people`}</p>
                                </li>

                            )
                        })}
            </ul>

            <button type="button" onClick={countryInformation} disabled={loading === true}>Haal land op</button>
            {error && <p className="error-message">Er is iets misgegaan. Probeer het nog eens opnieuw.</p>}
            {loading && <p className="loading-countries">De informatie wordt opgehaald</p>}

            {countryFound.length > 0 &&
            countryFound.map(country => (
                <li key={country?.name?.common}>
                    <h2>{country?.name?.common}</h2>
                    <img src={country?.flags?.png} alt={country?.flags?.alt}/>
                    <p>{`${country?.name?.common} is situated in ${country?.subregion} and the capital is ${country?.capital?.[0]}`}</p>
                </li>
                ))

            }

        </>
    )
}


export default App
