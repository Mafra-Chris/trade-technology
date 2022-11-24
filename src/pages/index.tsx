import { useEffect, useState } from 'react';

import StepCountries from '../components/StepCountries';
import StepLeagues from '../components/StepLeagues';
import StepTeams from '../components/StepTeams';
import StepTeamInfo from '../components/StepTeamInfo';
import StepAccess from '../components/StepAccess';

export default function Index() {
  const [currentStep, setCurrentStep] = useState('access');
  const [apiKey, setApiKey] = useState('');
  const [currentLeague, setCurrentLeague] = useState('');
  const [leagues, setLeagues] = useState([{}]);
  const [season, setSeason] = useState(2022);
  const [country, setCountry] = useState('');
  const [teams, setTeams] = useState([{}]);

  const [teamInfo, setTeamInfo] = useState({});

  const handleAccessStep = (data: { apiKey: string; step: string }) => {
    setApiKey(data.apiKey);
    setCurrentStep(data.step);
  };
  const handleCountriesStep = (data: {
    leagues: Array<Object>;
    season: number;
    country: string;
    step: string;
  }) => {
    setLeagues(data.leagues);
    setSeason(data.season);
    setCountry(data.country);
    setCurrentStep(data.step);
  };
  const handleLeaguesStep = (data: {
    teams: Array<Object>;
    league: string;
    step: string;
  }) => {
    setTeams(data.teams);
    setCurrentLeague(data.league);
    setCurrentStep(data.step);
  };
  const handleTeamsStep = (data: { teamInfo: Object; step: string }) => {
    setTeamInfo(data.teamInfo);
    setCurrentStep(data.step);
  };

  return (
    <div className="flex justify-center xl:w-2/3 ">
      {currentStep === 'access' && (
        <StepAccess handleAccessStep={handleAccessStep}></StepAccess>
      )}
      {currentStep === 'countries' && (
        <StepCountries
          handleCountriesStep={handleCountriesStep}
          apiKey={apiKey}
        ></StepCountries>
      )}
      {currentStep === 'leagues' && (
        <StepLeagues
          leagues={leagues}
          season={season}
          country={country}
          apiKey={apiKey}
          handleLeaguesStep={handleLeaguesStep}
        ></StepLeagues>
      )}
      {currentStep === 'teams' && (
        <StepTeams
          apiKey={apiKey}
          teams={teams}
          leagueId={currentLeague}
          season={season}
          handleTeamsStep={handleTeamsStep}
        ></StepTeams>
      )}
      {currentStep === 'teamInfo' && <StepTeamInfo teamInfo={teamInfo} />}
    </div>
  );
}
