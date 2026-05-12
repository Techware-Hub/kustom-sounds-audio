import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const SignupWallContext = createContext(null);

export function SignupWallProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);
  return (
    <SignupWallContext.Provider value={value}>
      {children}
    </SignupWallContext.Provider>
  );
}

export function useSignupWall() {
  const ctx = useContext(SignupWallContext);
  if (!ctx) throw new Error('useSignupWall must be used within SignupWallProvider');
  return ctx;
}
