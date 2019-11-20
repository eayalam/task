import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import { useSelector } from 'react-redux';
import moment from 'moment'

export default () => {

  const colors = ["blue", "red", "black", "green", "purple", "teal"];

  const data =  useSelector(state => state.metrics.values);

  const timestamps = new Set();
  const dataValues = [];
  let dataSet = [];

  data.forEach(item => {
    item.measurements.forEach(measure => {
      timestamps.add(measure.at);
    })
  })


  data.forEach(item => {
    dataValues.push(...item.measurements)
  });


  dataSet = Array.from(timestamps).map(at => {
    const filtered = dataValues.filter(item => item.at === at);

    const output = {
      name: moment(at).format('hh:mm A')
    }

    filtered.forEach(({metric, at, value}) => {
      output[metric] = value
    })

    return output
  })

  return (
    <div> {
      data.length ?
        <LineChart width={800} height={600} data={dataSet} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <XAxis dataKey="name"/>
          <YAxis />
          <CartesianGrid strokeDasharray="5 5"/>
          <Tooltip/>
          <Legend />

          {data.map((item, key) => (
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

