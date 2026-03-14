import { useState} from "react";
import SearchForm from './components/SearchForm';
import ResultsList from './components/ResultsList';

function App ()
{
    //results → will hold the flight search results.
    // setResults → used to update results whenever new data comes in.
    // useState(null) → initial value is null because when the app first loads, there are no search results yet.
    const [results, setResults] = useState(null);

    return(
        ////condition && expression
        //             //If condition is truthy, return expression.
        //             // If condition is falsy, return condition (React ignores null/false).
        <div>
            <h1>Layover Explorer</h1>
            <SearchForm onResults={setResults} />
            {results && <ResultsList flights={results} />}
        </div>
    );
}

export default App;