// src/renderWithRouter.js
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Teste se a aplicação é redirecionada para a página inicial', () => {
  const { history } = renderWithRouter(<App />);
  const linkHome = screen.getByRole('link', { name: /Home/i });
  expect(linkHome).toBeInTheDocument();
  userEvent.click(linkHome);
  expect(history.location.pathname).toBe('/');
});

test('Teste se a aplicação é redirecionada para a página About', () => {
  const { history } = renderWithRouter(<App />);
  const linkAbout = screen.getByRole('link', { name: /About/i });
  expect(linkAbout).toBeInTheDocument();
  userEvent.click(linkAbout);
  expect(history.location.pathname).toBe('/about');
});

test('Teste se a aplicação é redirecionada para a página Pokémons Favoritados', () => {
  const { history } = renderWithRouter(<App />);
  const linkFav = screen.getByRole('link', { name: /Favorite Pokémons/i });
  expect(linkFav).toBeInTheDocument();
  userEvent.click(linkFav);
  expect(history.location.pathname).toBe('/favorites');
});

test('Teste se a aplicação é redirecionada para a página Not Found', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/naoexiste');
});
