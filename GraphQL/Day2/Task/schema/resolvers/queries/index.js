import userQueries from "./user.queries.js";
import postQueries from "./post.queries.js";
import commentQueries from "./comment.queries.js";

const queries = {
  ...userQueries,
  ...postQueries,
  ...commentQueries,
};

export default queries;
