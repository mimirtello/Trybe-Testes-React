import React from 'react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

test('Teste se a página contém um heading h2', () => {
  renderWithRouter(<App />);
  const encontrados = screen.getByRole('heading', {
    name: 'Encountered pokémons',
    level: 2 });
  expect(encontrados).toBeInTheDocument();
});
test('Teste se é exibido o próximo pokémon da lista', () => {
  renderWithRouter(<App />);
  const botaoDeFogo = screen.getByRole('button', { name: 'Fire' });
  const botao = screen.getByRole('button', { name: 'Próximo pokémon' });

  // const PokemonsDeFogo = [{
  //   name: 'Charmander',
  //   type: 'Fire',
  // },
  // { name: 'Rapidash',
  //   type: 'Fire',
  // },

  // ];
  userEvent.click(botaoDeFogo);
  const pokemonEncontrado = screen.getByText('Charmander');
  expect(pokemonEncontrado).toBeInTheDocument();
  userEvent.click(botao);
  const SegundopokemonEncontrado = screen.getByText('Rapidash');
  expect(SegundopokemonEncontrado).toBeInTheDocument();
  userEvent.click(botao);
  expect(pokemonEncontrado).toBeInTheDocument();
});

test('Teste se a página tem botões de filtro', () => {
  renderWithRouter(<App />);
  const botaoDeFiltro = screen.getAllByTestId('pokemon-type-button');
  const arrayDeTipos = ['Electric',
    'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

  arrayDeTipos.forEach((element, index) => {
    expect(botaoDeFiltro[index]).toHaveTextContent(element);
  });
});

test('Teste se a página tem botões para resetar o filtro', () => {
  renderWithRouter(<App />);
  const botaoAll = screen.getByRole('button', { name: 'All' });
  userEvent.click(botaoAll);
  const primeiroPokemon = screen.getByText('Pikachu');
  expect(primeiroPokemon).toBeInTheDocument();
});
