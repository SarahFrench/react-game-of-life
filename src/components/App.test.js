import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const turnButton = screen.getByTestId('take-turn');
  const seedButton = screen.getByTestId('seed-life');
  expect(turnButton).toBeInTheDocument();
  expect(seedButton).toBeInTheDocument();
});
