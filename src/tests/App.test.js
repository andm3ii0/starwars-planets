import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import App from '../App';

test('testa se a tabela está na tela', () => {
  render(<App />);
  const table = screen.getByText('Name');
  expect(table).toBeInTheDocument();
});

test('testa se a tabela exibe todos os planetas', async () => {
  render(<App />);
  await new Promise((time) => setTimeout(time, 1000));
  const table = screen.queryAllByRole('row')

  expect(table).toHaveLength(11);
});

test('testa se o filtro numerico filtra usando a opção `maior que`', async () => {
  render(<App />);
  const inputColumnOption = screen.queryAllByTestId('column-filter-option')
  expect(inputColumnOption).toHaveLength(5);

  userEvent.selectOptions(screen.getByTestId('column-filter'), ['orbital_period'])
  expect(screen.getByRole('option', {name: 'orbital_period'}).selected).toBe(true)
  expect(screen.getByRole('option', {name: 'surface_water'}).selected).toBe(false)

  const inputcomparison = screen.getByTestId('comparison-filter')
  expect(inputcomparison).toBeInTheDocument();

  userEvent.selectOptions(screen.getByTestId('comparison-filter'), ['maior que'])
  expect(screen.getByRole('option', {name: 'maior que'}).selected).toBe(true)
  expect(screen.getByRole('option', {name: 'menor que'}).selected).toBe(false)
  expect(screen.getByRole('option', {name: 'igual a'}).selected).toBe(false)

  const inputValue = screen.getByTestId('value-filter')
  expect(inputValue).toBeInTheDocument()

  userEvent.type(inputValue, '350')

  const filterButton = screen.getByTestId('button-filter');
  expect(filterButton).toBeInTheDocument()

  userEvent.click(filterButton);

  await new Promise((time) => setTimeout(time, 1000));
  const table = screen.queryAllByRole('row')

  expect(table).toHaveLength(8);
});

test('testa se o filtro numerico filtra usando a opção `menor que`', async () => {
  render(<App />);
  const inputColumnOption = screen.queryAllByTestId('column-filter-option')
  expect(inputColumnOption).toHaveLength(5);

  userEvent.selectOptions(screen.getByTestId('column-filter'), ['orbital_period'])
  expect(screen.getByRole('option', {name: 'orbital_period'}).selected).toBe(true)
  expect(screen.getByRole('option', {name: 'surface_water'}).selected).toBe(false)

  const inputcomparison = screen.getByTestId('comparison-filter')
  expect(inputcomparison).toBeInTheDocument();

  userEvent.selectOptions(screen.getByTestId('comparison-filter'), ['menor que'])
  expect(screen.getByRole('option', {name: 'maior que'}).selected).toBe(false)
  expect(screen.getByRole('option', {name: 'menor que'}).selected).toBe(true)
  expect(screen.getByRole('option', {name: 'igual a'}).selected).toBe(false)

  const inputValue = screen.getByTestId('value-filter')
  expect(inputValue).toBeInTheDocument()

  userEvent.type(inputValue, '500')

  const filterButton = screen.getByTestId('button-filter');
  expect(filterButton).toBeInTheDocument()

  userEvent.click(filterButton);

  await new Promise((time) => setTimeout(time, 1000));
  const table = screen.queryAllByRole('row')

  expect(table).toHaveLength(8);
});