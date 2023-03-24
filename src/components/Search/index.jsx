import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const Search = ({ setSearchQuery }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <TextField
        id='search-bar'
        className='search-bar'
        onInput={(e) => {
          setSearchQuery(e.target.value);
        }}
        label='Pretraži klijente'
        variant='outlined'
        placeholder='Pretraga...'
        size='small'
      />
    </Box>
  );
};

export default Search;
