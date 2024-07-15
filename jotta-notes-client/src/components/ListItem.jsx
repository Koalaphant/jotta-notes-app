import { useState } from "react";
import { ProgressBar } from "./ProgressBar";
import { TickIcon } from "./TickIcon";
import { Modal } from "./Modal";

export const ListItem = ({ task, getData }) => {
  const [showModal, setShowModal] = useState(false);

  async function deleteItem() {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/todos/${task.id}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        getData();
      }
    } catch (err) {
      console.err(err);
    }
  }

  return (
    <li className="list-item">
      <div className="info-container">
        <TickIcon />
        <p className="task-title">{task.title}</p>
        <ProgressBar />
      </div>
      <div className="button-container">
        <button className="edit" onClick={() => setShowModal(true)}>
          Edit
        </button>
        <button className="delete" onClick={deleteItem}>
          Delete
        </button>
      </div>
      {showModal && (
        <Modal
          mode={"edit"}
          setShowModal={setShowModal}
          getData={getData}
          task={task}
        />
      )}
    </li>
  );
};
