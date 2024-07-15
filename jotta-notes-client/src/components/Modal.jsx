import { useState } from "react";

export const Modal = ({ mode, setShowModal, getData, task }) => {
  const editMode = mode === "edit";

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : "andrew.wardjones@icloud.com",
    title: editMode ? task.title : "",
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date(), // Adjusted for date format
  });

  async function postData(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status === 201) {
        console.log("WORKED");
        setShowModal(false);
        getData();
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function editdata(e) {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/todos/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log(response);
    if (response.status === 200) {
      setShowModal(false);
      getData();
    }

    try {
    } catch (err) {
      console.error(err);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} your task...</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
        <form>
          <input
            required
            maxLength={30}
            placeholder="Your task goes here"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="range">Drag to select your current progress</label>
          <input
            required
            type="range"
            id="range"
            min="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
          <input
            className={mode}
            type="submit"
            onClick={editMode ? editdata : postData}
          />
        </form>
      </div>
    </div>
  );
};
