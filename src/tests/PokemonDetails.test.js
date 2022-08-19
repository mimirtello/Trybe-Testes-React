import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const url = '/pokemons/25';

test('Teste se as informações do pokémon selecionado são mostradas na tela:', () => {
  const { history } = renderWithRouter(<App />);
  history.push(url);
  const detalhes = screen.getByRole('heading', { name: 'Pikachu Details', level: 2 });
  const summary = screen.getByRole('heading', { name: 'Summary', level: 2 });
  const paragrafo = screen.getByText(/This intelligent Pokémon roasts hard berries /);
  expect(detalhes).toBeInTheDocument();
  expect(summary).toBeInTheDocument();
  expect(paragrafo).toBeInTheDocument();
});

test('Teste se existem os mapas', () => {
  const { history } = renderWithRouter(<App />);
  history.push(url);
  const lugares = screen.getByRole('heading', {
    name: 'Game Locations of Pikachu',
    level: 2 });
  const kantoViridian = screen.getByText('Kanto Viridian Forest');
  const kantoPower = screen.getByText('Kanto Power Plant');
  const mapas = screen.getAllByRole('img', {
    name: 'Pikachu location' });
  expect(mapas[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(mapas[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  expect(lugares).toBeInTheDocument();
  expect(kantoViridian).toBeInTheDocument();
  expect(kantoPower).toBeInTheDocument();
});

test('Teste se usuario pode favoritas pokemons', () => {
  const { history } = renderWithRouter(<App />);
  history.push(url);
  const checkbox = screen.getByLabelText('Pokémon favoritado?');
  userEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  userEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
});
