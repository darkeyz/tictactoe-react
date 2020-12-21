import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders Grid showing whose turn it is', () => {
  render(<App />);
  const whoseTurn = screen.getByText(/Turn/i);
  expect(whoseTurn).toBeInTheDocument();
});
