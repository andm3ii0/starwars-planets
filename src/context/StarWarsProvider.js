import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [planetsList, setPlanetList] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const response = await data.json();
      const newObj = [...response.results].map((planet) => {
        delete planet.residents;
        return planet;
      });
      setPlanetList(newObj);
    };
    fetchAPI();
  }, []);

  const obj = {
    planetsList,
  };
  console.log(children);
  return (
    <StarWarsContext.Provider value={ obj }>
      { children }
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node,
};

StarWarsProvider.defaultProps = {
  children: '',
};

export default StarWarsProvider;
