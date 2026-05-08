// import React from "react";
import { useTranslation } from "react-i18next";
import "./Footer.css";

// class Footer extends React.Component {
//   render() {
//     return (
//       <footer>
//         <p>&copy; 2026 Tech News. All rights reserved. Developed By Shanab</p>
//       </footer>
//     );
//   }
// }

function Footer() {
  const { t } = useTranslation();

  return (
    <footer>
      <p>{t("footer.copyright")} Developed By Shanab</p>
    </footer>
  );
}

export default Footer;
