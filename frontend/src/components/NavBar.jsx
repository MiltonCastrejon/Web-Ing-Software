import React from 'react';
import styled from 'styled-components';
import '../styles/NavBar.css';

export default function NavBar() {
  return (
    <>
      <Container>
        <header className="header-nav">
          <div className="nav">
            <ul className="nav-items">
              <h2 className="tipelogo">Logo</h2>
              <li>Inicio</li>
              <li>Pepito</li>
              <li>Contacto</li>
              <li>Ayuda</li>
              <li>Perfil</li>
              <img
                src="https://media.gettyimages.com/id/1227618801/vector/human-face-avatar-icon-profile-for-social-network-man-vector-illustration.jpg?s=1024x1024&w=gi&k=20&c=jmyg6H4d9kkHPr4cA-w2ZYwcD9Hw2QXe61I-bYOEXgk="
                alt=""
                className="imgProfile"
              />
            </ul>
          </div>
        </header>
      </Container>
    </>
  );
}

const Container = styled.div`
  * {
    
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    color: #ffffff;
    font-family: 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', Helvetica,
      Arial, sans-serif;
  }

  .header-nav {
    width: 100%;
    height: 40px;
    align-items: center;
    background-color: rgba(22, 22, 23, 0.341);
    backdrop-filter: blur(18px);
  }

  .nav {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    padding: 0 20px;
  }

  .tipelogo {
    font-family: strasua;
    font-weight: 100;
  }

  .nav-items {
    width: auto;
    height: 100%;
    display: flex;
    text-decoration: none;
    justify-content: space-between;
    align-items: center;
  }

  .nav-items li {
    margin: 0 10px;
    padding: 0 15px;
    height: 50%;
    display: flex;
    border-radius: 28px;
    justify-content: space-between;
    align-items: center;
  }

  .nav-items li:hover {
    transform: scale(1.3);
    transition: 0.5s;
  }
  .imgProfile {
    width: 60%;
    height: 60%;
    border-radius: 50%;
    margin-left: 20px;
    margin-right: 10px;
  }
  @media screen and (max-width: 768px) {
    .nav-items li {
      margin: 0 5px;
      padding: 0 10px;
    }
    .imgProfile {
      width: 50%;
      height: 50%;
    }
  }
  @media screen and (max-width: 425px) {
    body {
      background-image: url('./res/background_img.jpg');
      font-family: 'Times New Roman', Times, serif;
      background-size: auto;
    }
    .nav-items li {
      margin: 0 5px;
      padding: 0 10px;
    }
    .imgProfile {
      width: 40%;
      height: 40%;
    }
  }
`;
