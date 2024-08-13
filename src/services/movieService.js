const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
  },
}

export default class MovieService {
  _apiBase = 'https://api.themoviedb.org/3/'
  _apiKey = '646f09e654acd9a51aef9d247eff4bb3'

  async getResource(searchFilm = 'return', page = 1) {
    const res = await fetch(
      `${this._apiBase}search/movie?query=${searchFilm}&include_adult=false&api_key=${this._apiKey}&language=en-US&page=${page}`,
      options
    )

    if (!res.ok) {
      throw new Error(`Could not fetch ${res}` + `, received ${res.status}`)
    }

    return await res.json()
  }

  async createGuestSession() {
    const newSession = await fetch(`${this._apiBase}authentication/guest_session/new?api_key=${this._apiKey}`, options)

    if (!newSession.ok) {
      throw new Error(`Could not fetch ${newSession}` + `, received ${newSession.status}`)
    }

    return await newSession.json()
  }

  async addRating(movieId, guestSessionId, rating) {
    const result = await fetch(
      `${this._apiBase}movie/${movieId}/rating?api_key=${this._apiKey}&guest_session_id=${guestSessionId}`,
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          value: rating,
        }),
      }
    )

    if (!result.ok) {
      throw new Error(`Could not fetch ${result}` + `, received ${result.status}`)
    }

    return await result.json()
  }

  async getRatedMovies(guestSessionId, page = 1) {
    const result = await fetch(
      `${this._apiBase}guest_session/${guestSessionId}/rated/movies?api_key=${this._apiKey}&language=en-US&page=${page}&sort_by=created_at.asc`,
      options
    )

    if (!result.ok) {
      throw new Error(`Could not fetch ${result}` + `, received ${result.status}`)
    }

    return await result.json()
  }

  async getMovies(movie, page) {
    const res = await this.getResource(movie, page)
    return res.results
  }
}
