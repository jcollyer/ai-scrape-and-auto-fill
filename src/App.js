import React, { useState } from "react";

function App() {
  const [form, setForm] = useState({ url: "", prompt: "" });

  const scrapeService = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:4000/screenshot?url=${form.url}/`)
      .then((response) => response.json())
      .then((data) => console.log("-------->", data))
      .catch((error) => console.error(error));
  };
  console.log("-------render-------", form);
  return (
    <div className="App">
      <h1>URL Scrape & Auto-fill</h1>

      <form onSubmit={(e) => scrapeService(e)}>
        <div>
          <h3>Enter URL to begin</h3>
          <input
            type="text"
            onChange={(e) => setForm({ ...form, url: e.target.value })}
          />
        </div>

        <div>
          <h3>Enter Prompt</h3>
          <input type="text" />
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
