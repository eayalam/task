import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../Features/Measures/reducer';
import { IState } from '../store'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
    emptyList: {
      outline: 'none',
      textAlign: 'center',
      color: '#333',
      cursor: 'default'
    }
  }),
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default ({title, items=[]}: { title: string, items: string[] }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { selectedItems } = useSelector((state: IState) => state.metrics);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const items = event.target.value as string[];
    dispatch(actions.addItemToSelectedItems(items));
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel>{title}</InputLabel>
        <Select
          multiple
          value={selectedItems}
          onChange={handleChange}
          input={<Input />}
          renderValue={selected => (selected as string[]).join(', ')}
          MenuProps={MenuProps}
        >
          {
            items.length ?
              items.map((name: string) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={selectedItems.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))
          : <p className={classes.emptyList}> Empty.</p>
          }
        </Select>
      </FormControl>
    </div>
  );
}
