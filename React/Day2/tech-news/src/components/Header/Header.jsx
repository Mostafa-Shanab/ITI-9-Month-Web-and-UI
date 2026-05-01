// import React from "react";
import "./Header.css";

// class Header extends React.Component {
//   render() {
//     return (
//       <header>
//         <h2>TechShanab</h2>
//         <ul>
//           <li>
//             <a href="#home">Home</a>
//           </li>
//           <li>
//             <a href="#about">About</a>
//           </li>
//           <li>
//             <a href="#contact">Contact</a>
//           </li>
//         </ul>
//       </header>
//     );
//   }
// }

function Header() {
  return (
    <header>
      <h2>TechShanab</h2>
      <ul>
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </header>
  );
}

export default Header;
