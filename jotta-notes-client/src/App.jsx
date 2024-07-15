import { useEffect, useState } from "react";
import { ListHeader } from "./components/ListHeader";
import { ListItem } from "./components/ListItem";
import { Auth } from "./components/Auth";

function App() {
  const [tasks, setTasks] = useState(null);
  const userEmail = "andrew.wardjones@icloud.com";

  const authToken = false;

  async function getData() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/todos/${userEmail}`
      );
      const json = await response.json();
      setTasks(json);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  //sort by date
  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  console.log(sortedTasks);
  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken && (
        <>
          <ListHeader listName={"🌴 Holiday Tick list"} getData={getData} />
          {sortedTasks?.map((task) => (
            <ListItem key={task.id} task={task} getData={getData} />
          ))}
        </>
      )}
    </div>
  );
}

export default App;
