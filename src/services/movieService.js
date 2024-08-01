const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDZmMDllNjU0YWNkOWE1MWFlZjlkMjQ3ZWZmNGJiMyIsIm5iZiI6MTcyMTgyNzY4MS41NDAzODgsInN1YiI6IjY2OWU0YWI3YTA0YjFkYzVjMzhiOTg2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TymTq1m3wGD25i0N-aTWLoEx-UVQsAwAWL4ObrVtF_c',
  },
}

export default class MovieService {
  _apiBase = 'https://api.themoviedb.org/3/search/movie?query='

  async getResource(searchFilm = 'return', page = 1) {
    const res = await fetch(`${this._apiBase}${searchFilm}&include_adult=false&language=en-US&page=${page}`, options)

    if (!res.ok) {
      throw new Error(`Could not fetch ${res}` + `, received ${res.status}`)
    }

    return await res.json()
  }

  async getMovies(movie, page) {
    const res = await this.getResource(movie, page)
    return res.results
  }
}
//  'https://api.themoviedb.org/3/search/movie?query=return&include_adult=false&language=en-US&page=3'

// MovieService.defaultProps = {
//   searchFilm: 'return',
// }
