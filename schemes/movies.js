const z = require('zod')

const movieScheme = z.object({
  title: z.string({
    invalid_type_error: 'movie title must be a string',
    required_error: 'movie title is required'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5.5),
  poster: z.string().url({
    message: 'movie poster must be a valid url'
  }),
  genre: z.array(
    z.enum(['Action', 'Comedy', 'Drama', 'Horror', 'Crime', 'Romance', 'Sci-fi'])
  )
})

function validateMovie (object) {
  return movieScheme.safeParse(object)
}

function validatePartialMovie (object) {
  return movieScheme.partial().safeParse(object)
}

module.exports = {
  validateMovie,
  validatePartialMovie
}
