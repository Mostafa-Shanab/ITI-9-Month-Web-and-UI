import "./App.css";

import Navbar from "./Components/Navbar";
import HeroSection from "./Components/HeroSection";
import MenuSection from "./Components/MenuSection";
import AboutSection from "./Components/AboutSection";
import ContactSection from "./Components/ContactSection";
import Footer from "./Components/Footer";

const menuItems = [
  {
    id: 1,
    title: "Grilled Salmon",
    description: "Freshly grilled salmon with herbs.",
    price: "$15.99",
    image: "./src/assets/food.jpg",
  },
  {
    id: 2,
    title: "Pasta Carbonara",
    description: "Creamy pasta with bacon and cheese.",
    price: "$12.99",
    image: "./src/assets/food.jpg",
  },
  {
    id: 3,
    title: "Cheesecake",
    description: "Classic New York-style cheesecake.",
    price: "$7.99",
    image: "./src/assets/food.jpg",
  },
  {
    id: 4,
    title: "Grilled Salmon",
    description: "Freshly grilled salmon with herbs.",
    price: "$15.99",
    image: "./src/assets/food.jpg",
  },
  {
    id: 5,
    title: "Pasta Carbonara",
    description: "Creamy pasta with bacon and cheese.",
    price: "$12.99",
    image: "./src/assets/food.jpg",
  },
  {
    id: 6,
    title: "Cheesecake",
    description: "Classic New York-style cheesecake.",
    price: "$7.99",
    image: "./src/assets/food.jpg",
  },
  {
    id: 7,
    title: "Cheesecake",
    description: "Classic New York-style cheesecake.",
    price: "$7.99",
    image: "./src/assets/food.jpg",
  },
  {
    id: 8,
    title: "Cheesecake",
    description: "Classic New York-style cheesecake.",
    price: "$7.99",
    image: "./src/assets/food.jpg",
  },
];

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <MenuSection menuItems={menuItems} />
      <AboutSection />
      <ContactSection />
      <Footer />
    </>
  );
}

export default App;
