import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Testing NotFound component', () => {
  it('should be render a title with "Page requested not found"', () => {
    renderWithRouter(<NotFound />);

    const title = screen.getByRole('heading', {
      name: (/Page requested not found/),
      level: 2,
    });
    expect(title).toBeDefined();
  });

  it('should be a error image', () => {
    renderWithRouter(<NotFound />);

    const errorImg = screen.getByAltText(/Pikachu crying because/i);
    expect(errorImg).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
