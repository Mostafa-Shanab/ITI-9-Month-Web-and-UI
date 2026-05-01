import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Form.css";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      desc: "",
      loading: false,
      error: null,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, desc } = this.state;

    if (!title.trim() || !desc.trim()) {
      this.setState({ error: "Please fill all fields" });
      return;
    }

    this.setState({ loading: true, error: null });

    const newPost = {
      id: uuidv4(),
      title,
      desc,
    };

    // POST request to JSON Server
    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add post");
        }
        return response.json();
      })
      .then(() => {
        // Immediately show the post
        if (this.props.onPostAdded) {
          this.props.onPostAdded(newPost);
        }
        this.setState({
          title: "",
          desc: "",
          loading: false,
          error: null,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error: error.message,
        });
        console.error("Error:", error);
      });
  };

  render() {
    const { title, desc, loading, error } = this.state;

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="input-field"
            placeholder="Title"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
          <input
            type="text"
            className="input-field"
            placeholder="Description"
            name="desc"
            value={desc}
            onChange={this.handleChange}
          />
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </>
    );
  }
}

export default Form;
