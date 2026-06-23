import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import connectDB from "./config/db.js";
import typeDefs from "./schema/typeDefs/index.js";
import resolvers from "./schema/resolvers/index.js";
import { verifyToken } from "./utils/auth.js";

async function startServer() {
  await connectDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT || 4000 },
    context: async ({ req }) => {
      const authHeader = req.headers.authorization || "";
      const token = authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : null;

      const decoded = token ? verifyToken(token) : null;

      return {
        // decoded is either { id, username, iat, exp } or null
        user: decoded,
      };
    },
  });

  console.log(`🚀 Server ready at: ${url}`);
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
