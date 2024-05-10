import css from './SearchBar.module.css';
import toast from 'react-hot-toast';
import { useState, FormEvent, ChangeEvent } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FC } from 'react';

type SubmitType = {
  onSubmit: (arg0: string) => void;
  isLoading: boolean;
};

const SearchBar: FC<SubmitType> = ({ onSubmit, isLoading }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = value.trim();
    if (!query.length) {
      toast.error('Please, enter your query');
    }

    onSubmit(query);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  return (
    <header className={css.search}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={handleChange}
        />
        <button className={css.searchBtn} type="submit">
          <FiSearch size="16px" />
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
