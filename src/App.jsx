import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const auditWebsite = async () => {

    try {

      setError("");
      setResult(null);

      const response = await axios.post(
        "https://digitalheroes-page-pulse-production.up.railway.app",
        {
          url: url
        }
      );

      setResult(response.data);

    } catch (err) {

      if (err.response) {
        setError(err.response.data);
      } else {
        setError("Unable to connect to server.");
      }

    }

  };

  return (
    <div className="container">

      <header className="header">
        <h1>DigitalHeroes</h1>
      </header>

      <div className="card">

        <h2>Page Pulse</h2>

        <p>Enter a website URL to audit</p>

        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button onClick={auditWebsite}>
          Audit Website
        </button>

        {error && (
          <p className="error">{error}</p>
        )}

        {result && (

          <div className="result">

            <h3>Audit Report</h3>

            <p><strong>Status :</strong> {result.status}</p>

            <p><strong>Response Time :</strong> {result.responseTime} ms</p>

            <p><strong>Title :</strong> {result.title}</p>

            <p><strong>Meta Description :</strong> {result.metaDescription}</p>

            <p><strong>H1 Count :</strong> {result.h1Count}</p>

            <p><strong>Images Without Alt :</strong> {result.imagesWithoutAlt}</p>

            <p><strong>Word Count :</strong> {result.wordCount}</p>

          </div>

        )}

      </div>

      <footer className="footer">
        © 2026 DigitalHeroes
      </footer>

    </div>
  );
}

export default App;
