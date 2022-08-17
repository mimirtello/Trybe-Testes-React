import React from 'react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import App from '../App';

const linkp = '/pokemons/25';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

test('Teste se é renderizado o Card', () => {
  renderWithRouter(<App />);
  const btnElectric = screen.getByRole('button', { name: 'Electric' });
  expect(btnElectric).toHaveTextContent('Electric');
  userEvent.click(btnElectric);
  const nomePokemon = screen.getByTestId('pokemon-name');
  const tipoPokemon = screen.getByTestId('pokemon-type');
  expect(tipoPokemon).toHaveTextContent('Electric');
  const pesoPokemon = screen.getByText(/Average weight/);
  const unidadeMedida = screen.getByText(/kg/);
  const imagemPokemon = screen.getByRole('img', { name: 'Pikachu sprite' });
  expect(imagemPokemon.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(nomePokemon).toBeInTheDocument();
  expect(imagemPokemon).toBeInTheDocument();
  expect(tipoPokemon).toBeInTheDocument();
  expect(pesoPokemon).toBeInTheDocument();
  expect(unidadeMedida).toBeInTheDocument();
});

test('este se o card do pokémon indicado na Pokédex contém um link de navegação', () => {
  const { history } = renderWithRouter(<App />);
  const btnElectric = screen.getByRole('button', { name: 'Electric' });
  expect(btnElectric).toHaveTextContent('Electric');
  userEvent.click(btnElectric);
  const linkPokemon = screen.getByRole('link', { name: /more details/i });
  expect(linkPokemon).toBeInTheDocument();
  userEvent.click(linkPokemon);
  expect(history.location.pathname).toBe(linkp);
});

test('Teste se ao clicar no link , é feito o redirecionamento', () => {
  const { history } = renderWithRouter(<App />);
  history.push(linkp);
  const titulo = screen.getByText('Pikachu Details');
  expect(titulo).toBeInTheDocument();
});

test('Teste se tem o ícone de favoritos', () => {
  const { history } = renderWithRouter(<App />);
  history.push(linkp);

  const checkbox = screen.getByRole('checkbox');
  userEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  const icone = screen.getByAltText('Pikachu is marked as favorite');
  expect(icone.src).toBe('http://localhost/star-icon.svg');
  expect(icone).toBeInTheDocument();
});
