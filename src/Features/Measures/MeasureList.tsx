import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import MeasureSelector from '../../components/MeasureSelector';
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

const SelectorMetrics = ({label}: {label: string}) => {
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
      <MeasureSelector title={label} items={items}/>
    </div>
  );
};

export default ({label}: {label: string}) => {
  return (
    <Provider value={client}>
      <SelectorMetrics label={label}/>
    </Provider>
  );
};
