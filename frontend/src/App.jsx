import { useState } from "react";
import SearchForm from './components/SearchForm';
import ResultsList from './components/ResultsList';
import './index.css'; 

function App() {
    const [results, setResults] = useState(null);

    return(
        <div>
            <h1 style={{textAlign: 'center', marginBottom: 'var(--space-6x)', color: 'var(--primary)'}}>
                Layover Explorer
            </h1>
            <SearchForm onResults={setResults} />
            {results && <ResultsList flights={results} />}
        </div>
    );
}

export default App;