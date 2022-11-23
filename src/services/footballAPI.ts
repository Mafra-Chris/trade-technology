import axios from "axios";

const BASE_URL = 'https://api-football-v1.p.rapidapi.com/v3'
const HOST = 'api-football-v1.p.rapidapi.com'

export async function testAPI(apiKey: string) {
  try {
    const response = await axios.get(`${BASE_URL}/timezone`, {
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': HOST
      }
    })
    if (response.status === 200) {
      return true
    }
  } catch (error) {
    return false
  }

}
export async function getCountries(apiKey: string) {
  try {
    const response = await axios.get(`${BASE_URL}/countries`, {
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': HOST
      }
    })
    return response.data.response.map((el: any) => {
      return {
        label: el.name,
        value: el.name,
        flag: el.flag,
      }
    })
  } catch (error) {
    console.log(error)
  }

}
export async function getLeagues(apiKey: string, country: string, season: number) {
  try {
    const response = await axios.get(`${BASE_URL}/leagues`, {
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': HOST
      },
      params: { country: country, season: season }
    })
    console.log(response)
    return response.data.response.map((el: any) => { return el.league })
  } catch (error) {
    console.log(error)
  }

}
export async function getTeams(apiKey: string, leagueId: number, season: number, country: string) {
  try {
    const response = await axios.get(`${BASE_URL}/teams`, {
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': HOST
      },
      params: { league: leagueId, season: season, country: country }
    })
    console.log(response)
    return response.data.response.map((el: any) => { return el.team })
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