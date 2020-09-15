const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {

  }
`);

const root = {

};

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
}));

app.listen(4000, () => {
  console.log('Running a GraphQL API server at localhost:4000/graphql');
});
