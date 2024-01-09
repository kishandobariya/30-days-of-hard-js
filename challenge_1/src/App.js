import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [word, setWord] = useState("");
  const [synonyms, setSynonyms] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSynonyms = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/thesaurus?word=${word}`,
        {
          headers: { "X-Api-Key": "pqVN/9sZ/SUnZTJpKcSqrA==F52NX0Nc94MwMYY6" },
        }
      );
      setSynonyms(response.data.synonyms);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching synonyms:", error);
      setLoading(false);
      setSynonyms([]);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Synonym Finder</h1>
      </header>
      <div className="synonyms-main">
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Enter a word"
        />
        <button onClick={fetchSynonyms} disabled={!word}>
          Find Synonyms
        </button>
        <div className="list-menu">
          {loading ? (
            <div>Loading...</div>
          ) : synonyms.length > 0 ? (
            <ul>
              {synonyms.map((synonym, index) => (
                <li key={index}>{synonym}</li>
              ))}
            </ul>
          ) : (
            <p>No synonyms found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
