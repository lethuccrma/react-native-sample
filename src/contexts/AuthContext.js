import { createContext } from 'react';

export default createContext({
  authentication: {
    authenticated: false,
    expire: '',
    token: '',
  },
  setAuthentication: () => {},
});
