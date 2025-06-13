import { render, screen } from '@testing-library/react';
import App from './App';

test('renders startseite titel', () => {
  render(<App />);
  const titleElement = screen.getByText(/willkommen auf der startseite/i);
  expect(titleElement).toBeInTheDocument();
});