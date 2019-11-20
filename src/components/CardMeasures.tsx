import React from 'react'
import { useSelector } from 'react-redux';
import Card from '../components/CardMeasure'
import { IState } from '../store';

export default () => {
  const { selectedItems } = useSelector((state: IState) => state.metrics);

  return (
    <div>
      {selectedItems.map((item: string, key: number) => (
        <Card key={key} name={item} value={key}/>
      ))}
    </div>
  )
}
