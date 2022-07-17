import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import { Header, Form, SearchbarButton, Input } from './Searchbar.style.js';

export const Searchbar = ({ onSearch, onChange, totalHits }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => setQuery(e.currentTarget.value.toLowerCase());

  const handleSubmit = e => {
    e.preventDefault();
    onSearch(query);
    setQuery('');
  };
  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
        />
        <SearchbarButton type="submit">
          <FaSearch size={12} />
        </SearchbarButton>
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  totalHits: PropTypes.number,
};

export default Searchbar;
