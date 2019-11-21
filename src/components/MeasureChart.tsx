import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import { useSelector } from 'react-redux';
import { IState } from '../store';
import moment from 'moment'
import { MetricListItem, MetricObject } from '../Features/Measures/reducer';

type ChartValue = {
  name: string;
  [key: string]: string;
}

export default () => {
  const colors = ["blue", "red", "black", "green", "purple", "teal"];
  const { values, selectedItems } =  useSelector((state: IState) => state.metrics);

  const timestamps = new Set();
  const dataValues = [] as MetricObject[];
  let dataSource = [];
  let dataSet = [];

  values.forEach((item: MetricListItem) => {
    item.measurements.forEach((measure: MetricObject) => {
      timestamps.add(measure.at);
    })
  })

  values.forEach((item: MetricListItem) => {
    dataValues.push(...item.measurements);
  });

  dataSet = Array.from(timestamps) as number[]
  dataSource = dataSet.map((at: number) => {
    const filtered = dataValues.filter((item: MetricObject) => item.at === at);

    const output = {
      name: moment(at).format('hh:mm A')
    } as ChartValue;

    filtered.forEach(({metric, value}: {metric: string, value: number}) => {
      output[metric] = value.toString();
    })

    return output;
  })

  return (
    <div>{
      selectedItems.length ?
        <LineChart width={800} height={600} data={dataSource} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <XAxis dataKey="name"/>
          <YAxis domain={['auto', 'auto']} />
          <CartesianGrid strokeDasharray="5 5"/>
          <Tooltip/>
          <Legend />

          {values.map((item, key) => (
            <Line
              key={key}
              isAnimationActive={false}
              type="linear" dataKey={item.metric}
              stroke={colors[key] || colors[0]}
              dot={false}
            />
          ))}
        </LineChart>
        : null
    }
    </div>
  );
}

