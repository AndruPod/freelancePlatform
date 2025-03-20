import {createContext, StrictMode, useContext} from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ApolloClient, ApolloProvider, InMemoryCache, createHttpLink} from "@apollo/client";
import {UserStore} from "./store/UserStore.jsx";
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: 'http://localhost:5000/graphql',
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export const Context = createContext(null);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ApolloProvider client={client}>
          <Context.Provider value={{
              user: new UserStore(),
          }}>
              <App />
          </Context.Provider>
      </ApolloProvider>
  </StrictMode>,
)
