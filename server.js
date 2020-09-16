const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type ToDo {
    id: ID!
    title: String!
    completed: Boolean!
  }

  type Group {
    id: ID!
    name: String!
    todos: [ToDo]!
  }

  type Query {
    todos: [ToDo]!
    todo(id: Int!): ToDo
  }

  type Mutation {
    createToDo(title: String!, completed: Boolean!): ToDo!
  }
`);

let todos = [];

const root = {
  todos: () => todos,
  todo: ({ id }) => {
    return todos.find((todo) => id === todo.id);
  },
  createToDo: ({ title, completed }) => {
    // id creation not ideal, but something simple while not connected to DB
    const newToDo = {id: todos.length + 1, title, completed};
    todos = [...todos, newToDo];
    return newToDo;
  }
};

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
}));

app.listen(4000, () => {
  console.log('Running a GraphQL API server at http://localhost:4000/graphql');
});
