import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/Logo-Villa.png';
import { NavLink } from 'react-router-dom';
import ArrowLeftTwoToneIcon from '@material-ui/icons/ArrowLeftTwoTone';
import ReceiptTwoToneIcon from '@material-ui/icons/ReceiptTwoTone';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import GroupAddTwoToneIcon from '@material-ui/icons/GroupAddTwoTone';
import MoreTwoToneIcon from '@material-ui/icons/MoreTwoTone';
import BallotTwoToneIcon from '@material-ui/icons/BallotTwoTone';

export function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const ModiSidebarOpen = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('auth');
    if (isAuthenticated) {
      setAuth(true);
      setName(localStorage.getItem('name'));
    } else {
      axios.get('http://localhost:3000').then((res) => {
        if (res.data.status === 'Bienvenido') {
          setAuth(true);
          setName(res.data.name);
          localStorage.setItem('auth', true);
          localStorage.setItem('name', res.data.name);
        } else {
          setAuth(false);
          setMessage(res.data.message);
          navigate('/Login');
        }
      });
    }
  }, [navigate]);
  const handleLogout = () => {
    axios
      .get('http://localhost:3000/logout')
      .then((res) => {
        if (res.data.message === 'Sesión cerrada') {
          setAuth(false);
          setName('');
          localStorage.removeItem('auth');
          localStorage.removeItem('name');
          navigate('/Login');
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Container isOpen={sidebarOpen}>
      <div className="side-conta">
        <button className="btnSidebar" onClick={ModiSidebarOpen}>
          <ArrowLeftTwoToneIcon />
        </button>
        <div className="logoContent">
          <a href="/">
            <div className="imgContent">
              <img className="ColorLogo" src={logo} alt="Logo" />
            </div>
          </a>
        </div>
        {linkArray.map(({ icon, label, to }) => (
          <div className="linkContent" key={label}>
            <NavLink
              to={to}
              className={({ isActive }) => `links${isActive ? ` active` : ``}`}
            >
              <div className="LinkIcon">{icon}</div>
              <div>{sidebarOpen && label}</div>
            </NavLink>
          </div>
        ))}
        <button className="btnSalir" onClick={handleLogout}>
          {' '}
          Salir
        </button>
      </div>
    </Container>
  );
}
//#region Array de links
const linkArray = [
  {
    label: 'Operaciones',
    icon: <ReceiptTwoToneIcon />,
    to: '/Operaciones',
  },
  {
    label: 'Categorias',
    icon: <MoreTwoToneIcon />,
    to: '/Categorias',
  },
  {
    label: 'Productos',
    icon: <BallotTwoToneIcon />,
    to: '/Productos',
  },
  {
    label: 'Clientes',
    icon: <PeopleAltTwoToneIcon />,
    to: '/Clientes',
  },
  {
    label: 'Proveedores',
    icon: <GroupAddTwoToneIcon />,
    to: '/Proveedores',
  },
];
//#endregion

//#region Estilos de Sidebar Top
const Container = styled.div`
  background-color: #3c5366;
  border-radius: 0px 20px 20px 0px;
  position: sticky;  
  .btnSidebar {
    position: absolute;
    top: 40px;
    color: #fff;
    right: -13px;
    height: 32px;
    width: 32px;
    border-radius: 50%;
    background: rgb(119, 118, 134);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    transform: ${({ isOpen }) => (isOpen ? 'rotate(0deg)' : 'rotate(180deg)')};
  }
  .logoContent {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0px;
    h2 {
      display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    }
    .imgContent {
      display: flex;
      img {
        width: 180px;
        max-width: 100%;
        height: auto;
      }
      cursor: pointer;
      transition: all 0.3s ease;
      transform: ${({ isOpen }) => (isOpen ? 'scale(1)' : 'scale(0.6)')};
    }.ColorLogo{
      filter: invert(70%) sepia(100%) hue-rotate(180deg);
    }
  }
    .linkContent {
        margin-top: 6px;
        padding: 10px 0px;
        :hover{
            background: rgba(203, 203, 205, 0.1);
            border-radius: 0px;
        }
        .links{
            display: flex;
            padding: 0px 15%;
            align-items: center;
            text-decoration: none;
            color: #fff;
            pading: 0px 10px
            margin: 0px 10px;
            .LinkIcon{
                padding: 10px;
                border-radius: 10px;
                margin: 0px 10px;
            }
            &.active{                
                margin: 0px 10px;
                background: rgb(119, 118, 134);
                border-radius: 10px;
                color: rgb(236, 195, 11);
                flex-direction: row-reverse;
            }
        }
    }
    .btnSalir{
      position: absolute;
      bottom: 60px;
      left: 25%;
        padding: 10px 15%; 
        background: rgb(213, 96, 98);         
        border-radius: 10px;
        border: none;
        color: #fff;
        cursor: pointer;
        transition: all 0.3s ease;
        :hover{
            background: red;
            border-radius: 10px;

        }
    }
`;
//#endregion
