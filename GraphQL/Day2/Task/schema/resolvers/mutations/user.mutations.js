import { GraphQLError } from "graphql";
import User from "../../../models/User.js";
import { generateToken } from "../../../utils/auth.js";
import { requireAuth } from "../../../middleware/auth.js";

const userMutations = {
  register: async (_, { input }) => {
    const { username, email, password } = input;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      throw new GraphQLError(
        "A user with that email or username already exists",
        {
          extensions: { code: "BAD_USER_INPUT" },
        },
      );
    }

    const user = await User.create({ username, email, password });
    const token = generateToken(user);

    return { token, user };
  },

  login: async (_, { input }) => {
    const { email, password } = input;

    const user = await User.findOne({ email });
    if (!user) {
      throw new GraphQLError("Invalid email or password", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new GraphQLError("Invalid email or password", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    }

    const token = generateToken(user);
    return { token, user };
  },

  updateUser: async (_, { id, input }, context) => {
    requireAuth(context);

    const user = await User.findByIdAndUpdate(id, input, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      throw new GraphQLError("User not found", {
        extensions: { code: "NOT_FOUND" },
      });
    }

    return user;
  },

  deleteUser: async (_, { id }, context) => {
    requireAuth(context);

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new GraphQLError("User not found", {
        extensions: { code: "NOT_FOUND" },
      });
    }

    return user;
  },
};

export default userMutations;
