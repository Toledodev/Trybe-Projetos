import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

// TODO: testar os testes
// tentando fazer o renderRouterAndWithContext

// -------------------------------------------------------------------
// import { createContext } from 'react';

// const MyContext = createContext();

// export default MyContext;

// function MyProvider({ children }) {

//   const [state, setState] = useState('state test');

//   return (
//     <MyContext.Provider value={ { state, setState } }>
//       { children }
//     </MyContext.Provider>
//   );
// }

// const renderWithRouterAndContext = (component) => {
//   const history = createMemoryHistory();
//   // <Router>
//   // <Provider>
//   // {children}
//   // </Provider>
//   // </Router>
//   return ({
//     ...render(
//       <Router history={ history }>{component}</Router>,
//     ),
//     history,
//   });
// };
// -------------------------------------------------------------------

// componente 'clean'
const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  // <Router>
  // <Provider>
  // {children}
  // </Provider>
  // </Router>
  return ({
    ...render(
      <Router history={ history }>{component}</Router>,
    ),
    history,
  });
};

export default renderWithRouter;

// ---------------------------------_> test-utils

// import React from 'react'
// import {render} from '@testing-library/react'
// import {ThemeProvider} from 'my-ui-lib'
// import {TranslationProvider} from 'my-i18n-lib'
// import defaultStrings from 'i18n/en-x-default'

// const AllTheProviders = ({children}) => {
//   return (
//     <ThemeProvider theme="light">
//       <TranslationProvider messages={defaultStrings}>
//         {children}
//       </TranslationProvider>
//     </ThemeProvider>
//   )
// }

// const customRender = (ui, options) =>
//   render(ui, {wrapper: AllTheProviders, ...options})

// // re-export everything
// export * from '@testing-library/react'

// // override render method
// export {customRender as render}
