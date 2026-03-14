import {useState} from 'react';
//using usestate so i can store the values of the form inputs and update them as the user types.
//This allows me to keep track of the user's input and use it when they submit the form.
export default function SearchForm({onResults}) {  //
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [interest, setInterest] = useState("");
    const [minLayover, setMinLayover] = useState(0);


    const handleSearch = async (e) => {//a variable that stores an async arrow function
        //used for event handlers.
        e.preventDefault();

        //sends input to backend
        const response= await fetch(
            `http://localhost:3001/api/flights/search?from=${from}&to=${to}&interest=${interest}&minLayoverHours=${minLayover}`
        );
        const data = await response.json();
        console.log("search results", data);

        if (onResults) onResults(data);
    };

    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Enter origin"
                value={from}
                onChange={(e) => setFrom(e.target.value.toUpperCase())}
            />
            <input
                type="text"
                placeholder="Enter destination"
                value={to}
                onChange={(e) => setTo(e.target.value.toUpperCase())}
            />
            <input
                type="text"
                placeholder="Enter interest (e.g art, nightlife, food)"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
            />
            <input
                type="number"
                placeholder="minimum layover hours"
                value={minLayover}
                onChange={(e) => setMinLayover(Number(e.target.value))}
            />
            <button type="submit">Search</button>
        </form>
    );
}
