import { act, render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('navega do splash para a tela de login', () => {
    render(<App />);
    expect(screen.getByText(/Cortex Companion/i)).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
  });
});
