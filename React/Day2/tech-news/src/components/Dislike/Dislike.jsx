import { Component } from "react";
import classes from "./Dislike.module.css";

class Dislike extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dislikes: 0,
    };
  }

  handleDislike = () => {
    this.setState({ dislikes: this.state.dislikes + 1 });
  };

  render() {
    const { dislikes } = this.state;

    return (
      <button className={classes["dislike-btn"]} onClick={this.handleDislike}>
        👎 Dislike ({dislikes})
      </button>
    );
  }
}

export default Dislike;
