import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  layout: {
    display: 'flex'
  },
});

const MeasurementLayout: React.FC = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.layout}>{children}</div>;
};

export default MeasurementLayout;
