import './App.css';
import axios from 'axios';
function App() {
async function countriesData(){
    try {
    const result = await
        axios.get(`https://restcountries.com/v3.1/all?fields=name,flags,population`)
console.log(result.data);
}catch (error)
    {
        console.error(error);
    }
}

countriesData();
    return (
        <>
        <button >Informatie over landen</button>
        </>
    )
}

export default App
