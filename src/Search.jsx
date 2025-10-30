import React, { useState } from "react";
import { useApp, ACTION_TYPES } from "./Reducer";

const SearchBox = () => {
  const { state, dispatch } = useApp();
  const [localQuery, setLocalQuery] = useState(state.query);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: ACTION_TYPES.SET_QUERY, payload: localQuery });
  };

  return (
    <form onSubmit={handleSubmit} className="search-box">
      <input
        type="text"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        placeholder="Dizi ara..."
        className="search-input"
      />
      <button type="submit" className="search-button">
        Ara
      </button>
    </form>
  );
};

export default SearchBox;
