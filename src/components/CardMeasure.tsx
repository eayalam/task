import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    minWidth: 230,
    maxWidth: 230,
    margin: 16
  }
});

export default ({name, value, unit}: {name: string, value: number, unit: string}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6">
          {name}
        </Typography>
        <Typography variant="h4">
          {value} <Typography variant="caption"><sup> {unit} </sup></Typography>
        </Typography>
      </CardContent>
    </Card>
  );
}
