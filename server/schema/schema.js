const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
} = require('graphql');

const { actors, movies, books } = require('../data');

const MovieType = new GraphQLObjectType({
  name: 'MovieType',
  fields: () => ({
    movieId: { type: GraphQLID },
    name: { type: GraphQLString },
    realisator: { type: GraphQLString },
  }),
});

const ActorType = new GraphQLObjectType({
  name: 'ActorType',
  fields: () => ({
    actorId: { type: GraphQLID },
    name: { type: GraphQLString },
  }),
});

const BooksType = new GraphQLObjectType({
  name: 'Bookstype',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    movie: {
      type: MovieType,
      args: {
        movieId: { type: GraphQLID },
      },
      resolve(parent, args) {
        return movies.find(({ movieId: id }) => args.movieId === id);
      },
    },

    actor: {
      type: ActorType,
      args: {
        actorId: { type: GraphQLID },
        name: { type: GraphQLString },
      },
      resolve(parent, args) {
        return actors.find(({ actorId: id }) => args.actorId === id);
      },
    },

    books: {
      type: BooksType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return books;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
