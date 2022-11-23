import { useState, useEffect } from 'react';
import * as api from '../services/footballAPI';
export default function StepAccess({ handleAccessStep }) {
  const [key, setKey] = useState('');

  async function submitKey() {
    let isValid = await api.testAPI(key);
    if (isValid) {
      handleAccessStep({ apiKey: key, step: 'countries' });
    }
    console.log(key);
  }
  return (
    <div className="mt-48">
      <h1 className="text-5xl font-bold text-b-blue">Meu Time</h1>
      <div className="mt-10">
        <label htmlFor="" className="font-semibold">
          Chave de acesso
          <input
            type="text"
            className="w-full  mb-4 rounded bg-gray-500 outline-none px-3 py-1 font-normal"
            onChange={(event) => setKey(event.target.value)}
          />
        </label>
        <button
          className="block rounded bg-b-blue text-gray-700 font-semibold px-4 py-1 w-full"
          onClick={submitKey}
        >
          Acessar
        </button>
      </div>
    </div>
  );
}
