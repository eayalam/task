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

const MeasureValues = ({after}: {after: number}) => {
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
    }
  });


  // fake data, EOG server is down

  // const FAKE_DATA = {
  //   getMultipleMeasurements: [{
  //     "metric": "tubingPressure",
  //     "measurements": [
  //       {
  //         "metric": "tubingPressure",
  //         "value": 1204.08,
  //         "unit": "PSI",
  //         "at": 1574239022172
  //       },
  //       {
  //         "metric": "tubingPressure",
  //         "value": 1137.38,
  //         "unit": "PSI",
  //         "at": 1574239023472
  //       },
  //       {
  //         "metric": "tubingPressure",
  //         "value": 1064.3,
  //         "unit": "PSI",
  //         "at": 1574239024774
  //       },
  //       {
  //         "metric": "tubingPressure",
  //         "value": 1111.2,
  //         "unit": "PSI",
  //         "at": 1574239026076
  //       },
  //       {
  //         "metric": "tubingPressure",
  //         "value": 1186.83,
  //         "unit": "PSI",
  //         "at": 1574239027376
  //       },
  //       {
  //         "metric": "tubingPressure",
  //         "value": 1254.69,
  //         "unit": "PSI",
  //         "at": 1574239028678
  //       }
  //     ]
  //   },{
  //     "metric": "injValveOpen",
  //     "measurements": [
  //         {
  //           "metric": "injValveOpen",
  //           "value": 54.91,
  //           "unit": "%",
  //           "at": 1574239022172
  //         },
  //         {
  //           "metric": "injValveOpen",
  //           "value": 55.91,
  //           "unit": "%",
  //           "at": 1574239023472
  //         },
  //         {
  //           "metric": "injValveOpen",
  //           "value": 60.06,
  //           "unit": "%",
  //           "at": 1574239024774
  //         },
  //         {
  //           "metric": "injValveOpen",
  //           "value": 64.05,
  //           "unit": "%",
  //           "at": 1574239026076
  //         },
  //         {
  //           "metric": "injValveOpen",
  //           "value": 61.22,
  //           "unit": "%",
  //           "at": 1574239027376
  //         },
  //         {
  //           "metric": "injValveOpen",
  //           "value": 62.17,
  //           "unit": "%",
  //           "at": 1574239028678
  //         },
  //         {
  //           "metric": "injValveOpen",
  //           "value": 63.59,
  //           "unit": "%",
  //           "at": 1574239029980
  //         },
  //         {
  //           "metric": "injValveOpen",
  //           "value": 60.23,
  //           "unit": "%",
  //           "at": 1574239031282
  //         },
  //         {
  //           "metric": "injValveOpen",
  //           "value": 62.17,
  //           "unit": "%",
  //           "at": 1574239032582
  //         },
  //         {
  //           "metric": "injValveOpen",
  //           "value": 66,
  //           "unit": "%",
  //           "at": 1574239033884
  //         },
  //         {
  //           "metric": "injValveOpen",
  //           "value": 64.3,
  //           "unit": "%",
  //           "at": 1574239035184
  //         },
  //         {
  //           "metric": "injValveOpen",
  //           "value": 63.12,
  //           "unit": "%",
  //           "at": 1574239036486
  //         },
  //         {
  //           "metric": "injValveOpen",
  //           "value": 66.01,
  //           "unit": "%",
  //           "at": 1574239037787
  //         },
  //         {
  //           "metric": "injValveOpen",
  //           "value": 63.07,
  //           "unit": "%",
  //           "at": 1574239039087
  //         }
  //     ]
  //   }]
  // }


  //

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
        <Card key={key} name={item.metric} value={item.measurements[0].value} unit={item.measurements[0].unit}/>
      ))}
    </div>
  );
};

export default ({after}: {after: number}) => {
  return (
    <Provider value={client}>
      <MeasureValues after={after}/>
    </Provider>
  );
};
