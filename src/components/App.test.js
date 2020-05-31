import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const button = screen.getByTestId('take-turn');
  expect(button).toBeInTheDocument();
});
