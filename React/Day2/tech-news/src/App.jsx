import "./App.css";
import Footer from "./components/Footer/Footer";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import Posts from "./components/Posts/Posts";
import Slider from "./components/Slider/Slider";

function App() {
  return (
    <>
      <Header></Header>
      <Slider></Slider>
      <main className="container">
        <Form></Form>
        <div>
          <Posts></Posts>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;
