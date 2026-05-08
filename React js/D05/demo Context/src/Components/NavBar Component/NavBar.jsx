import { Link, NavLink } from "react-router";
import './NavBar.css'
const NavBar = () => {
  return (
    <>
      <nav className="bg-success-subtle w-75 mx-auto my-3 rounded-3">
        <ul className="nav offset-1">
          <li className="p-2">
            <NavLink className="nl nav-link fs-5 fw-medium text-dark" to="/home">
              Home
            </NavLink>
          </li>
          <li className="p-2">
            <NavLink className="nl nav-link fs-5 fw-medium text-dark" to="/about">
              About
            </NavLink>
          </li>
          <li className="p-2">
            <NavLink className="nl nav-link fs-5 fw-medium text-dark" to="/profile">
              Profile
            </NavLink>
          </li>
          <li className="p-2">
            <NavLink className="nl nav-link fs-5 fw-medium text-dark" to="/task">
              Task
            </NavLink>
          </li>
          <li className="p-2">
            <NavLink className="nl nav-link fs-5 fw-medium text-dark" to="/tech">
              Tech
            </NavLink>
          </li>
          <li className="p-2">
            <NavLink className="nl nav-link fs-5 fw-medium text-dark" to="/users" end>
              Users
            </NavLink>
          </li>
          <li className="p-2">
            <NavLink className="nl nav-link fs-5 fw-medium text-dark" to="/users/add">
              Add User
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
