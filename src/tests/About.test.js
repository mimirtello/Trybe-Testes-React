import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
  renderWithRouter(<App />);
  const linkAbout = screen.getByRole('link', { name: /About/i });
  expect(linkAbout).toBeInTheDocument();
  userEvent.click(linkAbout);
  const aboutpoke = screen.getByRole('heading', {
    name: /About Pokédex/i,
    level: 2,
  });
  expect(aboutpoke).toBeInTheDocument();
});

test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
  renderWithRouter(<App />);
  const linkAbout = screen.getByRole('link', { name: /About/i });
  expect(linkAbout).toBeInTheDocument();
  userEvent.click(linkAbout);
  const aboutpokePrimeiroP = screen.getByText(/This application simulates/);
  const aboutpokeSegundoP = screen.getByText(/One can filter Pokémons/);
  expect(aboutpokePrimeiroP).toBeInTheDocument();
  expect(aboutpokeSegundoP).toBeInTheDocument();
});

test('Teste se a página contém uma imagem', () => {
  renderWithRouter(<App />);
  const linkAbout = screen.getByRole('link', { name: /About/i });
  expect(linkAbout).toBeInTheDocument();
  userEvent.click(linkAbout);
  // const imagemPoke = screen.getByAltText(/Pokédex/i);
  const imagemPoke = screen.getByRole('img', {
    name: /pokédex/i,
  });
  expect(imagemPoke.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
