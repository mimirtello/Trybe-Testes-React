import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Teste se é exibida na tela a mensagem No favorite pokemon found', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/favorites');
  const naoFavorito = screen.getByText('No favorite pokemon found');
  expect(naoFavorito).toBeInTheDocument();
});

test('Teste se é exibida na tela os cards', () => {
  renderWithRouter(<App />);

  const details = screen.getAllByRole('link', { name: /more details/i });
  userEvent.click(details[0]);

  const checkbox = screen.getAllByRole('checkbox');

  checkbox.forEach((check) => {
    userEvent.click(check);
    expect(check).toBeChecked();
  });

  const pokemon = screen.getByRole('heading', { name: 'Pikachu Details', level: 2 });
  expect(pokemon).toBeInTheDocument();
});
