import React, { useState } from 'react';
import '../styles/Header.css';

export default function Header({ Title, AddButton, FormComponent, onClose }) {
  return (
    <div>
      <header className="Header-Container">
        <div className="Header-title">
          <div>
            <div></div>
            <h1 className="Head-title">{Title}</h1>
          
          </div>
        </div>
      </header>
    </div>
  );
}
