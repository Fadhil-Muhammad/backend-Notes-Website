import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema/schema.js";
import { db } from "./database/db.js";

const resolvers = {
  Query: {
    notes() {
      return db("notes").select("*");
    },
    note(_, args) {
      return db("notes").where("id", args.id).first();
    },
  },
  Mutation: {
    async addNote(_, args) {
      let note = {
        ...args.note,
        createdAt: new Date().toISOString(),
      };
      const result = await db("notes").insert(note).returning("*");
      return { message: "successfully added note", note: result[0] };
    },

    async deleteNote(_, args) {
      const result = await db("notes").where("id", args.id).del();
      if (result === 0) {
        return { message: "Note not found" };
      }

      return { message: "successfully deleted note" };
    },

    async updateNote(_, args) {
      let note = {
        ...args.edits,
        createdAt: new Date().toISOString(),
      };
      const result = await db("notes")
        .where("id", args.id)
        .update(note)
        .returning("*");
      if (result.length === 0) {
        return { message: "Note not found" };
      }
      return { message: "successfully updated note", note: result[0] };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log("server ready at " + url);
