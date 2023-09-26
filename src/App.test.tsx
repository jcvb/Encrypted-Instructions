import { render, screen } from '@testing-library/react';
import App from './App';

import '@testing-library/jest-dom';

test('Test title Header', () => {
  // eslint-disable-next-line react/react-in-jsx-scope
  render(<App />);
  const linkElement = screen.getByText('Submit Your Information');
  expect(linkElement).toBeInTheDocument();
});
