import "./App.css";

import Navbar from "./Components/Navbar";
import HeroSection from "./Components/HeroSection";
import FeaturesSection from "./Components/FeaturesSection";
import ActionSection from "./Components/ActionSection";
import Footer from "./Components/Footer";

const cards = [
  {
    id: 1,
    title: "Spider Card 1",
    desc: "Creative modern UI design with hover animation.",
    image: "./src/assets/spider.jpg",
  },
  {
    id: 2,
    title: "Spider Card 2",
    desc: "Creative modern UI design with hover animation.",
    image: "./src/assets/spider.jpg",
  },
  {
    id: 3,
    title: "Spider Card 3",
    desc: "Creative modern UI design with hover animation.",
    image: "./src/assets/spider.jpg",
  },
  {
    id: 4,
    title: "Spider Card 4",
    desc: "Creative modern UI design with hover animation.",
    image: "./src/assets/spider.jpg",
  },
  {
    id: 5,
    title: "Spider Card 5",
    desc: "Creative modern UI design with hover animation.",
    image: "./src/assets/spider.jpg",
  },
  {
    id: 6,
    title: "Spider Card 6",
    desc: "Creative modern UI design with hover animation.",
    image: "./src/assets/spider.jpg",
  },
];
const features = [
  {
    id: 1,
    title: "Speed",
    desc: "Amazing experience with modern UI.",
  },
  {
    id: 2,
    title: "Design",
    desc: "Amazing experience with modern UI.",
  },
  {
    id: 3,
    title: "Responsive",
    desc: "Amazing experience with modern UI.",
  },
];

function App() {
  return (
    <>
      <Navbar />
      <HeroSection cards={cards} />
      <FeaturesSection features={features} />
      <ActionSection />
      <Footer />
    </>
  );
}

export default App;
