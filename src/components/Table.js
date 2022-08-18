import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const [filter, setFilter] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState('0');
  const [numberFilter, setNumberFilter] = useState([]);
  const {
    planetsList,
    availableFilters,
    setAvailableFilters,
  } = useContext(StarWarsContext);

  const onButtonFilterClick = () => {
    setAvailableFilters((prevState) => prevState
      .filter((available) => available !== columnFilter));
    setNumberFilter((prevState) => [...prevState, {
      column_filter: columnFilter,
      comparison_filter: comparisonFilter,
      value_filter: valueFilter,
    }]);
    // setColumnFilter([availableFilters[0]]);
  };

  const removeAllFilters = () => {
    setNumberFilter([]);
    setAvailableFilters(
      ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
    );
  };

  const onRemoveFilterButtonClick = ({ target }) => {
    const { value } = target;
    console.log(value);
    setNumberFilter((prevState) => prevState
      .filter((state) => state.column_filter !== value));
    setAvailableFilters((prevState) => [...prevState, value]);
  };

  const filterByNumber = (obj1, obj2) => {
    if (JSON.stringify(obj2) === '{}') {
      return true;
    }
    if (obj2.comparison_filter === 'maior que') {
      return parseInt(obj1[obj2.column_filter], 10) > parseInt(obj2.value_filter, 10);
    }
    if (obj2.comparison_filter === 'menor que') {
      return parseInt(obj1[obj2.column_filter], 10) < parseInt(obj2.value_filter, 10);
    }
    if (obj2.comparison_filter === 'igual a') {
      return parseInt(obj1[obj2.column_filter], 10) === parseInt(obj2.value_filter, 10);
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
            {availableFilters
              .map((availableFilter, index) => (
                <option
                  data-testid="column-filter-option"
                  key={ `${availableFilter}_${index}` }
                  value={ availableFilter }
                >
                  {availableFilter}

                </option>))}
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
      <div>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ removeAllFilters }
        >
          Remover tudo
        </button>
        {numberFilter.map((filterObj) => (
          <p
            data-testid="filter"
            key={ `${filterObj.column_filter}_${filterObj.value_filter}` }
          >
            {filterObj.column_filter}
            {' '}
            {filterObj.comparison_filter}
            {' '}
            {filterObj.value_filter}
            {' '}
            <button
              type="button"
              value={ filterObj.column_filter }
              onClick={ onRemoveFilterButtonClick }
            >
              Remover
            </button>
          </p>
        ))}
      </div>
      <table data-testid="table">
        <thead>
          <tr name="tr">
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
            .filter((planet) => !numberFilter
              .map((filterObj) => filterByNumber(planet, filterObj)).includes(false))
            .filter((planet) => planet.name.toLowerCase().includes(filter.toLowerCase()))
            .map((planet) => (
              <tr key={ planet.name }>
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
