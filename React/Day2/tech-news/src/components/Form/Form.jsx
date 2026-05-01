// import { Component } from "react";
import "./Form.css";

// class Form extends Component {
//   render() {
//     return (
//       <>
//         <form>
//           <input type="text" class="input-field" placeholder="Title" />
//           <input type="text" class="input-field" placeholder="Description" />
//           <button type="submit" class="submit-btn">
//             Submit
//           </button>
//         </form>
//       </>
//     );
//   }
// }

function Form() {
  return (
    <>
      <form>
        <input type="text" className="input-field" placeholder="Title" />
        <input type="text" className="input-field" placeholder="Description" />
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </>
  );
}

export default Form;
