import { useEffect, useState } from 'react';
import * as api from '../services/footballAPI';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from './LoadingSpinner';

interface Props {
  handleCountriesStep: Function;
  apiKey: string;
}

export default function StepCountries(props: Props) {
  const [countryptions, setCountryptions] = useState([
    {
      label: '',
      value: '',
      flag: '',
    },
  ]);
  const currentYear = new Date().getFullYear();
  const [seasons, setSeasons] = useState([
    { label: currentYear, value: currentYear },
  ]);
  const [selectedCountry, setSelectedCountry] = useState<string>();
  const [selectedSeason, setSelectedSeason] = useState<number>();

  function generateArrayOfYears() {
    let min = 2010;
    let years = [];

    for (let year = currentYear; year >= min; year--) {
      years.push({ label: year, value: year });
    }
    return years;
  }
  const [loading, setLoading] = useState(true);
  async function getLeagues() {
    setLoading(true);
    const leagues = await api.getLeagues(
      props.apiKey,
      selectedCountry || '',
      selectedSeason || 0
    );
    setLoading(false);
    if (leagues.length <= 0) {
      toast.error('Nenhuma liga encontrada!');
      return;
    } else if (!leagues) {
      toast.error('Erro ao buscar ligas!');
      return;
    }
    let data = {
      leagues: leagues,
      season: selectedSeason,
      country: selectedCountry,
      step: 'leagues',
    };

    props.handleCountriesStep(data);
  }

  useEffect(() => {
    const getCountryptions = async () => {
      let response = await api.getCountries(props.apiKey);
      setLoading(false);
      if (response) {
        setCountryptions(response);
      } else {
        toast.error('Erro ao buscar países!');
      }
    };
    getCountryptions();
    setSeasons(generateArrayOfYears());
  }, []);

  return (
    <>
      {!loading ? (
        <div className="w-full mt-48 max-w-2xl">
          <ToastContainer />
          <h1 className="text-5xl font-bold text-b-blue text-center">
            Escolha um país e uma temporada
          </h1>
          <div className="flex gap-2 mt-10 text-gray-700">
            <Select
              className="grow rounded "
              options={countryptions}
              formatOptionLabel={(options) => (
                <div className="flex">
                  <img
                    src={options.flag}
                    alt="country-image"
                    className="h-8 mr-3"
                  />
                  <span>{options.label}</span>
                </div>
              )}
              onChange={async (value) => {
                if (value) {
                  setSelectedCountry(value.value);
                }
              }}
            />
            <Select
              options={seasons}
              onChange={async (value) => {
                if (value) {
                  setSelectedSeason(value.value);
                }
              }}
            />
          </div>
          <div className="text-center">
            <button
              onClick={() => getLeagues()}
              className="rounded bg-b-blue text-gray-700 font-semibold px-4 py-1 w-full md:w-1/2 mt-4 "
            >
              Buscar
            </button>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}
