import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

import '@testing-library/jest-dom';

test('Test App H1 Header', () => {
  render(<App />);
  const linkElement = screen.getByText('Vite + React');
  expect(linkElement).toBeInTheDocument();
});
