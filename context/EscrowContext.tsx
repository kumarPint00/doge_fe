'use client';

import { createContext, useReducer, Dispatch, PropsWithChildren } from 'react';
import { GiftItem } from '@/types/gift';
import { MetaMaskProvider } from '@/lib/wallet';

interface State {
  items: GiftItem[];
  message: string;
  code?: string;
  provider?: MetaMaskProvider;
}

type Action =
  | { type: 'add'; item: GiftItem }
  | { type: 'remove'; id: string }
  | { type: 'setMessage'; message: string }
  | { type: 'setCode'; code: string }
  | { type: 'setProvider'; provider: MetaMaskProvider }
  | { type: 'reset' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add':
      if (state.items.find(i => i.id === action.item.id)) return state;
      return { ...state, items: [...state.items, action.item] };
    case 'remove':
      return { ...state, items: state.items.filter(i => i.id !== action.id) };
    case 'setMessage':
      return { ...state, message: action.message };
    case 'setCode':
      return { ...state, code: action.code };
    case 'setProvider':
      return { ...state, provider: action.provider };
    case 'reset':
      return { items: [], message: '' };
    default:
      return state;
  }
}

const EscrowContext = createContext<[State, Dispatch<Action>] | undefined>(undefined);

export function EscrowProvider({ children }: PropsWithChildren) {
  const store = useReducer(reducer, { items: [], message: '' });
  return (
    <EscrowContext.Provider value={store}>
      {children}
    </EscrowContext.Provider>
  );
}

export default EscrowContext;
