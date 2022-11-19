// INTRO GRAPHQL

// Toda REQUEST é POST
// Toda REQUEST bate no MESMO endpoint, que por convenção é /graphql

// Para saber o que recurso utilizar e caminho usa-se:
// QUERY    => Obter informações ( equivalente à GET )
// MUTATION => Manipular dados ( equivalente à POST, PUT, PATCH, DELETE )
// SCALAR TYPES => Tipos primitivos do graphql (ID, String, Bool, Int, Float)

const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Mapeamento de 1 para 1 nos resolver
const resolvers = {
  Query: {
    hello: () => "Hello world",
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log(`Server started at ${url}`));
