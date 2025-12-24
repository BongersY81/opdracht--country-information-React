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
    const [searchQuery, setSearchQuery] = useState("");
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


    async function handleSubmit(event) {
        event.preventDefault();

        toggleLoading(true)

        try {
            const result = await
                axios.get(`https://restcountries.com/v3.1/name/${searchQuery}`);
            console.log(result.data);
            setCountryFound(result.data);
            setSearchQuery("");
         toggleError(false)
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
            <h1>World Regions</h1>
            <div className="button-data">

                <button type="button" onClick={countriesData} disabled={loading === true}>Haal landen op</button>

                {error && <p className="error-message">Er is iets misgegaan. Probeer het nog eens opnieuw.</p>}
                {loading && <p className="loading-countries">De informatie wordt opgehaald</p>}
            </div>

            <h2> Search country information</h2>

            <ul className="country-flag">
                {worldMap.length > 0 &&
                    worldMap.sort((a, b) => (a?.population || 0) - (b?.population || 0))
                        .map((country) => {
                            return (<li key={country?.name?.common}>
                                    <img src={country?.flags?.png} alt={country?.flags?.alt}/>
                                    <h3 className={regionName(country?.region)}>
                                        {country?.name?.common}
                                    </h3>
                                    <p>{`Has a population of ${country?.population} people`}</p>
                                </li>

                            )
                        })}
            </ul>


            <article className="button-information">
                <form onSubmit={handleSubmit}>
                    <input
                        type="search"
                        id="form-search-input"
                        name="search-input"
                        value={searchQuery}
                        placeholder="Bijvoorbeeld Nederland of Peru"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <div className="search-button">
                        <button type="submit" disabled={loading === true}>Zoek</button>

                        {error && <p className="error-message">Er is iets misgegaan. Probeer het nog eens opnieuw.</p>}
                        {loading && <p className="loading-countries">De informatie wordt opgehaald</p>}
                    </div>
                </form>
            </article>


            {countryFound.length > 0 && (
                <ul className="country-information">

                    {countryFound.map(country => (

                        <li key={country?.name?.common}>
                            <article className="country-list">
                                <h2>{country?.name?.common}</h2>
                                <div className="country-image">
                                <img src={country?.flags?.png} alt={country?.flags?.alt}/>
                                </div>
                                <p>{`${country?.name?.common} is situated in ${country?.subregion} and the capital is ${country?.capital?.[0]}`}</p>
                                <p>{`It has a population of ${roundToMillions(country?.population)}  people and borders with ${country?.borders} neighboring countries.`}</p>
                                <p>{`website can be found on ${country?.tld} domain's`}</p>
                            </article>
                        </li>

                    ))}

                </ul>
            )}


        </>
    );
}


export default App
