import { Component } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import Posts from "./components/Posts/Posts";
import Slider from "./components/Slider/Slider";

class App extends Component {
  state = {
    posts: [],
  };

  handleNewPost = (newPost) => {
    this.setState((prevState) => ({
      posts: [newPost, ...prevState.posts],
    }));
  };

  render() {
    return (
      <>
        <Header></Header>
        <Slider></Slider>
        <main className="container">
          <Form onPostAdded={this.handleNewPost}></Form>
          <div>
            <Posts initialPosts={this.state.posts}></Posts>
          </div>
        </main>
        <Footer></Footer>
      </>
    );
  }
}

export default App;
