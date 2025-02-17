const Movie = require('./models/Movie');


const resolvers = {

    Query: {

        movies: async () => await Movie.find(),
        movie: async (_, { id }) => await Movie.findById(id),

        },

        Mutation: {

            addMovieRecord: async(_, args) => {

                const newMovie = new Movie(args)
                await newMovie.save()
                return newMovie

            },

            updateMovieRecord: async (_, { id, ...updates }) => {

                return await Movie.findByIdAndUpdate(id, updates, { new: true})

            },

            deleteMovieRecord: async (_, { id }) => {

                return await Movie.findByIdAndDelete(id)

            },
        }
    
};

module.exports = resolvers;


// -- note: 
// REFERENCE: PRO MERN: distinct to Apollo Servers
// (_, { }) the underscore refers to the parent, indicating we are ignoring it