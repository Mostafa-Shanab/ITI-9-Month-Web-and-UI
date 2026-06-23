import User from "../../../models/User.js";

const userQueries = {
  getAllUsers: async () => {
    return await User.find();
  },

  getUserById: async (_, { id }) => {
    return await User.findById(id);
  },
};

export default userQueries;
