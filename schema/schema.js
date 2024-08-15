export const typeDefs = `#graphql
 type Note {
    id: ID!
    title: String!
    body: String!
    createdAt: String!
 }

 type Query {
    notes: [Note]
    note(id: ID!): Note
 }

 type Mutation{
   addNote(note: addNoteInput!): addNoteResponse
   deleteNote(id: ID!): message
   updateNote(id: ID!, edits: editNoteInput!):updateNoteResponse
 }
 input addNoteInput{
   title: String!
   body: String!
 }
 type addNoteResponse{
   note: Note
   message: String!
 }

 input editNoteInput{
   title: String
   body: String
 }
 type updateNoteResponse{
   note: Note
   message: String!
 }

 type message {
   message: String!
 }
`;
