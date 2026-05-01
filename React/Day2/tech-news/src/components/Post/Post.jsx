import { Component } from "react";
import "./Post.css";

class Post extends Component {
  // render() {
  //   return (
  //     <div className="tech-card">
  //       <h3 className="tech-card-title">
  //         Understanding REST APIs in Backend Development
  //       </h3>
  //       <p className="tech-card-desc">
  //         Learn how REST APIs work, why they are important, and how to design
  //         scalable backend services using best practices.
  //       </p>
  //     </div>
  //   );
  // }
  render() {
    const { title, desc } = this.props;
    return (
      <div className="tech-card">
        <h3 className="tech-card-title">{title}</h3>
        <p className="tech-card-desc">{desc}</p>
      </div>
    );
  }
}
// function Post() {
//   return (
//     <div className="tech-card">
//       <h3 className="tech-card-title">
//         Understanding REST APIs in Backend Development
//       </h3>
//       <p className="tech-card-desc">
//         Learn how REST APIs work, why they are important, and how to design
//         scalable backend services using best practices.
//       </p>
//     </div>
//   );
// }

export default Post;
