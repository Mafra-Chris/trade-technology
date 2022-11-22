import { useEffect } from 'react';
import { getCountries } from '../services/footballAPI';
export default function Index() {
  // useEffect(() => {
  //   getCountries('13ae0696d433e93d861b5be7b5a33701');
  // });
  return (
    <>
      <h1 className="text-red-800">Hello World</h1>
    </>
  );
}
