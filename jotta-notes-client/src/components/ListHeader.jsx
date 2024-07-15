import { useState } from "react";
import { Modal } from "./Modal";

export const ListHeader = ({ listName, getData }) => {
  const [showModal, setShowModal] = useState(false);

  function signOut() {
    console.log("signout");
  }

  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="create" onClick={() => setShowModal(true)}>
          Add New
        </button>
        <button className="signout" onClick={signOut}>
          Sign Out
        </button>
      </div>
      {showModal && (
        <Modal mode={"create"} setShowModal={setShowModal} getData={getData} />
      )}
    </div>
  );
};
