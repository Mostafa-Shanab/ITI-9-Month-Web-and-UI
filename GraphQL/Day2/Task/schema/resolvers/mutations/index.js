import userMutations from "./user.mutations.js";
import postMutations from "./post.mutations.js";
import commentMutations from "./comment.mutations.js";

const mutations = {
  ...userMutations,
  ...postMutations,
  ...commentMutations,
};

export default mutations;
