import React from 'react';
import styled from 'styled-components';
import logo from '../assets/react.svg';
import { NavLink } from 'react-router-dom';
import { HiOutlineChevronDoubleLeft } from 'react-icons/hi';

export function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const ModiSidebarOpen = () => {
    setSidebarOpen(!sidebarOpen);
  }
  return (
    <Container isOpen={sidebarOpen}>
      <button
        className="btnSidebar"
        onClick={ModiSidebarOpen}
      >
        <HiOutlineChevronDoubleLeft />
      </button>
      <div className="logoContent">
        <div className="imgContent">
          <img src={logo} alt="Logo" />
        </div>
        <h2>Aldair</h2>
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
     
    </Container>
  );
}
//#region Array de links
const linkArray = [
  {
    label: 'Operaciones',
    icon: <HiOutlineChevronDoubleLeft />,
    to: '/',
  },
  {
    label: 'Productos',
    icon: <HiOutlineChevronDoubleLeft />,
    to: '/Productos',
  },
  {
    label: 'Clientes',
    icon: <HiOutlineChevronDoubleLeft />,
    to: '/Clientes',
  },
  {
    label: 'Proveedores',
    icon: <HiOutlineChevronDoubleLeft />,
    to: '/Proveedores',
  },
];
//#endregion

//#region Estilos de Sidebar Top
const Container = styled.div`
  background: #9247fc;
  position: sticky;
  .btnSidebar {
    position: absolute;
    top: 40px;
    right: -13px;
    height: 32px;
    width: 32px;
    padding: 0px;
    border-radius: 50%;
    background: #white;
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
        width: 50px;
        max-width: 100%;
        height: auto;
      }
      cursor: pointer;
      transition: all 0.3s ease;
      transform: ${({ isOpen }) => (isOpen ? 'scale(1)' : 'scale(1.5)')};
    }
  }
    .linkContent {
        margin-top: 20px;
        padding: 10px 15%;
        :hover{
            background: #6a1b9a;
            border-radius: 0px;

        }
        .links{
            display: flex;
            align-items: center;
            text-decoration: none;
            color: #fff;
            pading: 0px 10px
            margin: 0px 10px;
            .LinkIcon{
                padding: 10px;
                display: flex;
            }
            &.active{
                background: #6a1b9a;
            }
        }
    }
`;
//#endregion
