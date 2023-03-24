import FormControl from '@mui/material/FormControl';
import { TextField } from '@mui/material';

const Sort = (props) => {
  const { select, labelId, id, value, label, onChange, sx, menuItems } = props;
  return (
    <FormControl sx={sx}>
      <TextField
        select={select}
        labelId={labelId}
        id={id}
        label={label}
        value={value}
        onChange={onChange}
        variant='standard'
      >
        {menuItems.map((menuItem) => menuItem)}
      </TextField>
    </FormControl>
  );
};

export default Sort;
