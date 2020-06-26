import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

/**
 * Checks whether the app renders with a header or not.
 */
test('renders customer insights app', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText("Customer Insights");
  expect(linkElement).toBeInTheDocument();
});
