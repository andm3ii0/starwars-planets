import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const [filter, setFilter] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState('0');
  const [numberFilter, setNumberFilter] = useState({});
  const { planetsList } = useContext(StarWarsContext);

  const onButtonFilterClick = () => {
    setNumberFilter({
      columnFilter,
      comparisonFilter,
      valueFilter,
    });
  };

  const filterByNumber = (obj1, obj2) => {
    if (JSON.stringify(obj2) === '{}') {
      return true;
    }
    if (obj2.comparisonFilter === 'maior que') {
      return parseInt(obj1[columnFilter], 10) > parseInt(valueFilter, 10);
    }
    if (obj2.comparisonFilter === 'menor que') {
      return parseInt(obj1[columnFilter], 10) < parseInt(valueFilter, 10);
    }
    if (obj2.comparisonFilter === 'igual a') {
      return parseInt(obj1[columnFilter], 10) === parseInt(valueFilter, 10);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="filter">
          <input
            id="filter"
            type="text"
            name="name-filter"
            value={ filter }
            data-testid="name-filter"
            onChange={ ({ target }) => setFilter(target.value) }
          />
        </label>
      </div>
      <div>
        <label htmlFor="number-filter">
          <select
            id="number-filter"
            value={ columnFilter }
            onChange={ ({ target }) => setColumnFilter(target.value) }
            data-testid="column-filter"
          >
            { numberFilter.columnFilter !== 'population'
            && <option value="population">population</option>}
            { numberFilter.columnFilter !== 'orbital_period'
            && <option value="orbital_period">orbital_period</option> }
            { numberFilter.columnFilter !== 'diameter'
            && <option value="diameter">diameter</option> }
            { numberFilter.columnFilter !== 'rotation_period'
            && <option value="rotation_period">rotation_period</option> }
            { numberFilter.columnFilter !== 'surface_water'
            && <option value="surface_water">surface_water</option> }
          </select>
        </label>
        <label htmlFor="comparison-filter">
          <select
            id="comparison-filter"
            value={ comparisonFilter }
            onChange={ ({ target }) => setComparisonFilter(target.value) }
            data-testid="comparison-filter"
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="value-filter">
          <input
            type="number"
            name="value-filter"
            value={ valueFilter }
            onChange={ ({ target }) => setValueFilter(target.value) }
            data-testid="value-filter"
          />
        </label>
        <button type="button" data-testid="button-filter" onClick={ onButtonFilterClick }>
          Filtrar
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {planetsList
            .filter((planet) => filterByNumber(planet, numberFilter))
            .filter((planet) => planet.name.toLowerCase().includes(filter.toLowerCase()))
            .map((planet) => (
              <tr key={ planet.diameter }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
