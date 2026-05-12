import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SignupWallProvider, useSignupWall } from '../src/context/SignupWallContext';

function Probe() {
  const { isOpen, open, close } = useSignupWall();
  return (
    <div>
      <span data-testid="state">{isOpen ? 'open' : 'closed'}</span>
      <button onClick={open}>open</button>
      <button onClick={close}>close</button>
    </div>
  );
}

describe('SignupWallContext', () => {
  it('opens and closes the wall', () => {
    render(
      <SignupWallProvider>
        <Probe />
      </SignupWallProvider>
    );
    expect(screen.getByTestId('state').textContent).toBe('closed');
    fireEvent.click(screen.getByText('open'));
    expect(screen.getByTestId('state').textContent).toBe('open');
    fireEvent.click(screen.getByText('close'));
    expect(screen.getByTestId('state').textContent).toBe('closed');
  });
});
