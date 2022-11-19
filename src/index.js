// INTRO GRAPHQL

// Toda REQUEST é POST
// Toda REQUEST bate no MESMO endpoint, que por convenção é /graphql

// Para saber o que recurso utilizar e caminho usa-se:
// QUERY    => Obter informações ( equivalente à GET )
// MUTATION => Manipular dados ( equivalente à POST, PUT, PATCH, DELETE )
// SCALAR TYPES => Tipos primitivos do graphql (ID, String, Bool, Int, Float)

const { ApolloServer, gql } = require("apollo-server");

const users = [
  {
    _id: String(Math.random()),
    name: "Octavio",
    email: "octavio@teste.com",
    active: true,
  },
  {
    _id: String(Math.random()),
    name: "Junior",
    email: "junior@teste.com",
    active: true,
  },
  {
    _id: String(Math.random()),
    name: "Chagas",
    email: "chagas@teste.com",
    active: false,
  },
];

const typeDefs = gql`
  type User {
    # => O ponto ! serve para dizer que este campo é obrigatório
    _id: ID!
    name: String!
    email: String!
    active: Boolean!
  }

  # => É possivel fazer um aninhamento de tipos. Algo como uma relação entre os tipos
  type Post {
    _id: ID!
    title: String
    content: String
    author: User!
  }

  type Query {
    hello: String
    users: [User!]!
    # O ponto ! fora do array, significa que não pode retornar null ( users: null)
    # E o ponto ! dentro do array, significa que não pode retornar um array com null ( users: [null])
    getUserByEmail(email: String!): User!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
  }
`;

// Mapeamento de 1 para 1 nos resolver
const resolvers = {
  Query: {
    hello: () => "Hello world",
    users: () => users,
    getUserByEmail: (_, args) => {
      return users.find((user) => user.email === args.email);
    },
  },

  Mutation: {
    createUser: (_, args) => {
      const newUser = {
        _id: String(Math.random()),
        name: args.name,
        email: args.email,
        active: true,
      };
      users.push(newUser);
      return newUser;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log(`Server started at ${url}`));

/** Exemplo de aninhamento:

query {
  posts{
    title
    author {
      name
      email
      active
    }
  }
}
Pega o post, seu titulo. O autor e seus dados!
*/
