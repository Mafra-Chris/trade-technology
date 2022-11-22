import axios from "axios";

const BASE_URL = 'https://v3.football.api-sports.io'
const HOST = 'v3.football.api-sports.io'

export async function getCountries(apiKey: string) {
  try {
    const response = await axios.get(`${BASE_URL}/countries`, {
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': HOST
      }
    })
    return response.data.response
  } catch (error) {
    console.log(error)
  }

}
export async function getLeagues(apiKey: string, countryCode: string) {
  try {
    const response = await axios.get(`${BASE_URL}/leagues`, {
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': HOST
      },
      params: { code: countryCode }
    })
    return response.data.response
  } catch (error) {
    console.log(error)
  }

}
export async function getTeams(apiKey: string, leagueId: number) {
  try {
    const response = await axios.get(`${BASE_URL}/teams`, {
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': HOST
      },
      params: { league: leagueId }
    })
    return response.data.response
  } catch (error) {
    console.log(error)
  }

}
export async function getTeamStats(apiKey: string, leagueId: number, season: number, teamId: number) {
  try {
    const response = await axios.get(`${BASE_URL}/teams/statistics`, {
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': HOST
      },
      params: {
        league: leagueId,
        season: season,
        team: teamId
      }
    })
    return response.data.response
  } catch (error) {
    console.log(error)
  }

}
export async function getTeamPlayers(apiKey: string, leagueId: number, season: number, teamId: number) {
  try {
    const response = await axios.get(`${BASE_URL}/players`, {
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': HOST
      },
      params: {
        league: leagueId,
        season: season,
        team: teamId
      }
    })
    return response.data.response
  } catch (error) {
    console.log(error)
  }

}