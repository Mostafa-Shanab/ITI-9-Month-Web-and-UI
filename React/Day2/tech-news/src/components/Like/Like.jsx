import { Component } from "react";
import classes from "./Like.module.css";

class Like extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 0,
    };
  }

  handleLike = () => {
    this.setState({ likes: this.state.likes + 1 });
  };

  render() {
    const { likes } = this.state;

    return (
      <button className={classes["like-btn"]} onClick={this.handleLike}>
        👍 Like ({likes})
      </button>
    );
  }
}

export default Like;
