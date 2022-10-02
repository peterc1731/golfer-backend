import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import mercurius from "mercurius";
import mercuriusCodegen from "mercurius-codegen";
import { connect } from "mongoose";
import * as dotenv from "dotenv";
import path from "path";
import { resolvers } from "./resolvers";
import { schema } from "./schema";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const app = Fastify();

const buildContext = async (req: FastifyRequest, _reply: FastifyReply) => {
  return {
    authorization: req.headers.authorization,
  };
};

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T;

declare module "mercurius" {
  interface MercuriusContext
    extends PromiseType<ReturnType<typeof buildContext>> {}
}

app.register(mercurius, {
  schema,
  resolvers,
  context: buildContext,
  graphiql: true,
});

mercuriusCodegen(app, {
  targetPath: "./src/graphql/generated.ts",
  outputSchema: "./src/graphql/schema.gql",
  codegenConfig: {
    mappers: {
      User: "../dataSources/user#DataSourceUser",
      Game: "../dataSources/game#DataSourceGame",
      Hole: "../dataSources/game#DataSourceHole",
      DateTime: "string",
    },
    scalars: {
      DateTime: "Date",
    },
    inputMaybeValue: "T | undefined",
  },
}).catch(console.error);

connect(`mongodb+srv://cluster0.3reh571.mongodb.net`, {
  retryWrites: true,
  writeConcern: { w: "majority" },
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASSWORD,
})
  .then(() => {
    console.log("MongoDB connected successfully ✅");
    return app.listen({ port: 3000 });
  })
  .then(() => {
    console.log("Server is running on port 3000 🚀");
  })
  .catch((err) => {
    console.log("Error starting server ❌");
    console.error(err);
  });
