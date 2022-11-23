import { useState, useEffect } from 'react';
import * as api from '../services/footballAPI';

export default function StepTeams({
  teams,
  leagueId,
  season,
  apiKey,
  handleTeamsStep,
}) {
  const [teamsElements, setTeamsElements] = useState();

  async function getTeamInfo(teamId: number) {
    const stats = await api.getTeamStats(apiKey, leagueId, season, teamId);
    const players = await api.getTeamPlayers(apiKey, leagueId, season, teamId);
    console.log({ stats: stats, players: players });
    let data = {
      teamInfo: { stats: stats, players: players },
      step: 'teamInfo',
    };
    handleTeamsStep(data);
  }
  useEffect(() => {
    setTeamsElements(
      teams.map((team: any) => (
        <div
          className=" text-center flex flex-col p-4 cursor-pointer "
          key={team.id}
          onClick={async () => {
            getTeamInfo(team.id);
          }}
        >
          <img
            src={team.logo}
            alt={team.name || 'Imagem do time'}
            className="p-1 m-auto object-fit bg-white rounded-md"
          />
          <h1 className="font-semibold mt-2">{team.name}</h1>
        </div>
      ))
    );
  }, [teams]);

  return (
    <div>
      <h1 className="text-5xl font-bold text-b-blue text-center">
        Escolha um time
      </h1>
      <div className="grid grid-cols-2 gap-4 mt-10 md:grid-cols-3 md:gap-12">
        {teamsElements}
      </div>
    </div>
  );
}
