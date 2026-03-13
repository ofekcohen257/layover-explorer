import {useState} from 'react';
//using usestate so i can store the values of the form inputs and update them as the user types.
//This allows me to keep track of the user's input and use it when they submit the form.
function SearchForm() {  //
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [interest, setInterest] = useState("");

    // for the mean time, later will call backend
    const handleSearch = (e) => {
        e.preventDefault();
        console.log({origin, destination, interest});
    }

    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Enter origin"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter interest (e.g art, nightlife, food)"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    );
}
export default SearchForm;