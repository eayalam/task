import React from 'react';
import createStore from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import MeasureLayout from './components/MeasureLayout';
import MeasureList from './Features/Measures/MeasureList';
import MeasureValues from './Features/Measures/MeasureValues';
import MeasureChart from './components/MeasureChart'

const store = createStore();
const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

function getMinutesAgo (minutes: number) {
  const now = new Date();
  const newTime = now.setMinutes( now.getMinutes() - minutes );
  return +newTime
}

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <Wrapper>
        <Header />
        <MeasureList label="Metrics" />
        <MeasureLayout>
          <MeasureValues every={2000} after={getMinutesAgo(1)} />
          <MeasureChart />
        </MeasureLayout>
        <ToastContainer />
      </Wrapper>
    </Provider>
  </MuiThemeProvider>
);

export default App;
