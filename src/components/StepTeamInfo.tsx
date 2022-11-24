import { useState, useEffect } from 'react';
import BarChart from './BarChart';

export default function StepTeamInfo({ teamInfo }) {
  const [showMore, setShowMore] = useState(false);
  const [lineupSplited, setLineupSplited] = useState([0, 0, 0, 0]);

  useEffect(() => {
    setMostUsedLineup();
  }, []);

  function setMostUsedLineup() {
    if (teamInfo.stats.lineups > 0) {
      let maxPlayed = Math.max(...teamInfo.stats.lineups.map((e) => e.played));
      let lineup = teamInfo.stats.lineups.find(
        (lineup) => lineup.played === maxPlayed
      );

      if (lineup.formation) {
        setLineupSplited(lineup.formation.split('-'));
      }
    }
  }
  function getPlayers() {
    let players = teamInfo.players.map((player) => {
      return (
        <li
          key={player.player.id}
          className="flex mb-2 border-b border-gray-300 py-1 cursor-pointer hover:bg-gray-300"
        >
          <img
            className="h-10 rounded-full border-blue-900 border mr-2 md:mr-4"
            src={player.player.photo}
          />
          <div>
            <h1>{`${player.player.firstname} ${player.player.lastname}, ${player.player.age} anos`}</h1>
            <h2 className="font-medium text-sm text-gray-600">
              {player.player.nationality}
            </h2>
          </div>
        </li>
      );
    });
    return players;
  }
  return (
    <div className="w-full">
      <div className="flex flex-wrap py-8">
        <img src={teamInfo.stats.team.logo} className="h-24 md:h-28" />
        <div className="ml-4 md:ml-16">
          <h1 className="font-bold mt-2 text-4xl uppercase">
            {teamInfo.stats.team.name}
          </h1>
          {/* <h2 className="mt-2 font-semibold text-gray-200">1895 | Série A</h2> */}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-md text-black font-semibold p-4">
          <h1 className="font-bold text-xl uppercase border-b border-gray-300 pb-1">
            Jogos{' '}
            <span className="text-gray-500">
              {teamInfo.stats.fixtures.played.total}
            </span>
          </h1>
          <div className="pt-1 uppercase">
            <div className="grid grid-cols-3 mt-2">
              <div>
                <h1>Total</h1>
                <div>
                  <span className="text-green-500">
                    {teamInfo.stats.fixtures.wins.total}
                  </span>{' '}
                  - <span>{teamInfo.stats.fixtures.draws.total}</span> -{' '}
                  <span className="text-red-500">
                    {teamInfo.stats.fixtures.loses.total}
                  </span>
                </div>
              </div>
              <div className="flex justify-center">
                <div>
                  <h1>Em casa</h1>
                  <div>
                    <span className="text-green-500">
                      {teamInfo.stats.fixtures.wins.home}
                    </span>{' '}
                    - <span>{teamInfo.stats.fixtures.draws.home}</span> -{' '}
                    <span className="text-red-500">
                      {teamInfo.stats.fixtures.loses.home}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <div>
                  <h1>Fora</h1>
                  <div>
                    <span className="text-green-500">
                      {teamInfo.stats.fixtures.wins.away}
                    </span>{' '}
                    - <span>{teamInfo.stats.fixtures.draws.away}</span> -{' '}
                    <span className="text-red-500">
                      {teamInfo.stats.fixtures.loses.away}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:row-span-2 h-96 md:h-auto flex flex-col">
          <div>
            <h1 className="font-bold text-xl uppercase mb-2">
              Formação mais utilizada
            </h1>
          </div>
          <div className="grow grid grid-rows-5 bg-grass rounded-md field">
            <div className="flex justify-center items-center ">
              <div className="h-8 w-8 bg-yellow-400 rounded-full"></div>
            </div>
            <div className="flex justify-center items-center gap-16">
              {Array.from({ length: lineupSplited[0] }, (el, index) => (
                <div
                  className="h-8 w-8 bg-gray-300 rounded-full"
                  key={index}
                ></div>
              ))}
            </div>
            <div className="flex justify-center items-center gap-16">
              {Array.from({ length: lineupSplited[1] }, (el, index) => (
                <div
                  className="h-8 w-8 bg-gray-300 rounded-full"
                  key={index}
                ></div>
              ))}
            </div>
            <div className="flex justify-center items-center gap-16">
              {Array.from({ length: lineupSplited[2] }, (el, index) => (
                <div
                  className="h-8 w-8 bg-gray-300 rounded-full"
                  key={index}
                ></div>
              ))}
            </div>
            <div className="flex justify-center items-center">
              {Array.from({ length: lineupSplited[3] || 0 }, (el, index) => (
                <div
                  className="h-8 w-8 bg-gray-300 rounded-full"
                  key={index}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div
            className={`bg-white rounded-md text-black font-semibold p-4 ${
              showMore ? '' : 'max-h-96'
            } overflow-hidden md:overflow-auto md:max-h-96`}
          >
            <h1 className="uppercase font-bold text-xl border-b border-gray-300 pb-1">
              Jogadores
            </h1>

            <ul className="pt-4">{getPlayers()}</ul>
          </div>
          <div className="text-center -mt-4 md:hidden">
            <button
              className="rounded bg-b-blue text-gray-700 font-semibold px-4 py-1 shadow-xl"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? 'Ver Menos' : 'Ver Mais'}
            </button>
          </div>
        </div>
        <div className="md:col-span-2 bg-white rounded-md font-semibold p-4 text-black mb-4">
          <h1 className="font-bold text-xl uppercase">
            Gols marcados por tempo de Jogo
          </h1>
          <BarChart
            labels={['0-5', '16-30', '31-45']}
            datasets={[
              {
                label: 'Gols',
                data: [
                  teamInfo.stats.goals.for.minute['0-15'].total,
                  teamInfo.stats.goals.for.minute['16-30'].total,
                  teamInfo.stats.goals.for.minute['31-45'].total,
                ],
                backgroundColor: 'rgba(26, 41, 60, 0.5)',
              },
            ]}
          ></BarChart>
        </div>
      </div>
    </div>
  );
}
