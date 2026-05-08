import { Link, NavLink } from "react-router";
import "./NavBar.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
const NavBar = () => {
  // let { t, i18n } = useTranslation(["nav", 'from']);
  let { t, i18n } = useTranslation(["nav"]);

  let user1 = {
    role: 'Admin',
  };

  let user2 = {
    role: 'Student',
  };

  let user3 = {
    role: 'Instructor',
  };

  let lang = useSelector((state)=> state.languageR.language);

  return (
    <>
      {/* <h1>{user.name[i18n.language]}</h1> */}
      <h1>{t(`role.${user2.role}`)}</h1>

      <nav className="bg-success-subtle w-75 mx-auto my-3 rounded-3" dir={lang === 'en'?'ltr':'rtl'}>
        <ul className="nav offset-1">
          <li className="p-2">
            <NavLink
              className="nl nav-link fs-5 fw-medium text-dark"
              to="/home"
            >
              {t("home")}
            </NavLink>
          </li>
          <li className="p-2">
            <NavLink
              className="nl nav-link fs-5 fw-medium text-dark"
              to="/about"
            >
              {t("about")}
            </NavLink>
          </li>
          <li className="p-2">
            <NavLink
              className="nl nav-link fs-5 fw-medium text-dark"
              to="/profile"
            >
              {t("profile")}
            </NavLink>
          </li>
          <li className="p-2">
            <NavLink
              className="nl nav-link fs-5 fw-medium text-dark"
              to="/task"
            >
              {t("task")}
            </NavLink>
          </li>
          <li className="p-2">
            <NavLink
              className="nl nav-link fs-5 fw-medium text-dark"
              to="/tech"
            >
              {t("tech")}
            </NavLink>
          </li>
          <li className="p-2">
            <NavLink
              className="nl nav-link fs-5 fw-medium text-dark"
              to="/users"
              end
            >
              {t("users")}
            </NavLink>
          </li>
          <li className="p-2">
            <NavLink
              className="nl nav-link fs-5 fw-medium text-dark"
              to="/users/add"
            >
              {t("addUser")}
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
