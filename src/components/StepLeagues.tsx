import { useState, useEffect } from 'react';
import * as api from '../services/footballAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from './LoadingSpinner';
export default function StepLeagues({
  leagues,
  season,
  country,
  apiKey,
  handleLeaguesStep,
}) {
  const [leaguesElements, setLeaguesElements] = useState();
  const [loading, setLoading] = useState(false);
  async function getTeams(leagueId: number) {
    setLoading(true);
    const teams = await api.getTeams(apiKey, leagueId, season, country);
    setLoading(false);
    if (teams.length <= 0) {
      toast.error('Nenhum time encontrado!');
      return;
    } else if (!teams) {
      toast.error('Erro ao buscar times!');
      return;
    }
    let data = { teams: teams, step: 'teams', league: leagueId };
    handleLeaguesStep(data);
  }
  useEffect(() => {
    setLeaguesElements(
      leagues.map((league: any) => (
        <div
          className=" text-center flex flex-col p-4 cursor-pointer "
          key={league.id}
          onClick={async () => {
            getTeams(league.id);
          }}
        >
          <div className="">
            <img
              src={league.logo}
              alt={league.name || 'Imagem da liga'}
              className="p-1 m-auto  object-fit bg-white rounded-md"
            />
          </div>
          <h1 className="font-semibold mt-2">{league.name}</h1>
        </div>
      ))
    );
  }, [leagues]);

  return (
    <>
      {!loading ? (
        <div>
          <ToastContainer />
          <h1 className="text-5xl font-bold text-b-blue text-center">
            Escolha uma liga
          </h1>
          <div className="grid grid-cols-2 gap-4 mt-10 md:grid-cols-3 md:gap-12  rounded-lg">
            {leaguesElements}
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}
