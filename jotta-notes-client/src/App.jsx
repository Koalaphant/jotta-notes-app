import { useEffect, useState } from "react";
import { ListHeader } from "./components/ListHeader";
import { ListItem } from "./components/ListItem";
import { Auth } from "./components/Auth";
import { useCookies } from "react-cookie";

function App() {
  const [cookie, setCookie, removeCookie] = useCookies(null);
  const [tasks, setTasks] = useState(null);
  const authToken = cookie.AuthToken;
  const userEmail = cookie.Email;

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
    if (authToken) {
      getData();
    }
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
          <ListHeader listName={"Jotta To-Do App ✏️"} getData={getData} />
          <p>
            Welcome back <strong>{userEmail}</strong>
          </p>
          {sortedTasks?.map((task) => (
            <ListItem key={task.id} task={task} getData={getData} />
          ))}
        </>
      )}
    </div>
  );
}

export default App;
