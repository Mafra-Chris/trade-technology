import { useState, useEffect } from 'react';
import * as api from '../services/footballAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    if (!stats || !players) {
      toast.error('Erro ao buscar estatísticas do time!');
      return;
    }
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
      <ToastContainer />
      <h1 className="text-5xl font-bold text-b-blue text-center">
        Escolha um time
      </h1>
      <div className="grid grid-cols-2 gap-4 mt-10 md:grid-cols-3 md:gap-12">
        {teamsElements}
      </div>
    </div>
  );
}
