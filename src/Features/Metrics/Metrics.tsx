import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import Selector from '../../components/MeasureSelector';
import { IState } from '../../store';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const query = `
  query {
    getMetrics
  }
`;


const getMetrics = (state: IState) => {
  return state.metrics
};

const Metrics = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(getMetrics);

  const [result] = useQuery({
    query: query
  });


  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.metricsApiErrorReceived({ error: error.message }));
      return;
    }

    if (!data) return;
    dispatch(actions.metricsDataRecevied(data));
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;

  return (
    <div>
      <Selector title={'Metrics'} items={items}/>
    </div>
  );
};

export default () => {
  return (
    <Provider value={client}>
      <Metrics />
    </Provider>
  );
};