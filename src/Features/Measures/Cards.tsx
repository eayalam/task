import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, MetricListItem } from './reducer';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import { IState } from '../../store';
import Card from '../../components/CardMeasure'

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const query = `
  query ($input: [MeasurementQuery]){
    getMultipleMeasurements(input: $input){
      metric
      measurements {
        metric
        value
        unit
        at
      }
    }
  }
`

const getMetrics = (state: IState) => {
  return state.metrics
};

const MeasureValues = ({every, after}: {every: number, after: number}) => {
  const dispatch = useDispatch();
  const { values } = useSelector(getMetrics);
  const { selectedItems } = useSelector((state: IState) => state.metrics);

  const [result] = useQuery({
    query: query,
    variables: {
      input: selectedItems.map(item => ({
        metricName: item,
        after
      }))
    },
    pollInterval: every,
    requestPolicy: 'cache-and-network',
  });


  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.metricsApiErrorReceived({ error: error.message }));
      return;
    }

    if (!data) return;
    dispatch(actions.updateMetricValues(data));
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;

  return (
    <div>
      {values.map((item: MetricListItem, key: number) => (
        <Card key={key} name={item.metric} value={item.measurements[item.measurements.length - 1].value} unit={item.measurements[0].unit}/>
      ))}
    </div>
  );
};

export default ({every, after}: {every: number, after: number}) => {
  const { selectedItems } = useSelector((state: IState) => state.metrics);

  return (
    <Provider value={client}>
      {selectedItems.length > 0 ? <MeasureValues every={every} after={after}/> : null}
    </Provider>
  );
};
