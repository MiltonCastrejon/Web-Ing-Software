import React, { useState } from 'react';
import '../styles/Header.css';

export default function Header({ Title, AddButton, FormComponent,  }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <header className="Header-Container">
        <div className="Header-title">
          <div>
            <div></div>
            <h1 className="Head-title">{Title}</h1>
          </div>
          <button className="Button-Header" onClick={handleAddButtonClick}>
            {AddButton}
            <span></span>
          </button>
        </div>
      </header>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <FormComponent onClose={handleModalClose} />
          </div>
        </div>
      )}
    </>
  );
}

