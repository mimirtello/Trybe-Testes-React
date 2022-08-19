// src/renderWithRouter.js
import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Teste se a página contém o texto Page requested not found', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/naoexiste');
  const notFound = screen.getByRole('heading', {
    name: /Page requested not found/i,
    level: 2 });
  const imgNotFound = screen.getByRole('img', {
    name: 'Pikachu crying because the page requested was not found' });
  expect(imgNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  expect(notFound).toBeInTheDocument();
});
