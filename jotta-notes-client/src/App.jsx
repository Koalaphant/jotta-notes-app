import { useEffect } from "react";
import { ListHeader } from "./components/ListHeader";

function App() {
  async function getData() {
    const userEmail = "andrew.wardjones@icloud.com";
    try {
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`);
      const json = await response.json();
      console.log(json);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => getData, []);

  return (
    <div className="app">
      <ListHeader listName={"Holiday Tick list"} />
    </div>
  );
}

export default App;
