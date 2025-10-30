import React from "react";
import { useApp, ACTION_TYPES } from "./Reducer";

const Filters = () => {
  const { state, dispatch } = useApp();

  const handleFilterChange = (filterType, value) => {
    dispatch({
      type: ACTION_TYPES.SET_FILTERS,
      payload: { [filterType]: value },
    });
  };

  return (
    <div className="filters">
      <div className="filter-group">
        <label>Tür:</label>
        <select
          value={state.filters.genre}
          onChange={(e) => handleFilterChange("genre", e.target.value)}
        >
          <option value="">Tüm Türler</option>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedy</option>
          <option value="Action">Aksiyon</option>
          <option value="Science-Fiction">Bilim Kurgu</option>
          <option value="Horror">Korku</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Dil:</label>
        <select
          value={state.filters.language}
          onChange={(e) => handleFilterChange("language", e.target.value)}
        >
          <option value="">Tüm Diller</option>
          <option value="English">İngilizce</option>
          <option value="Turkish">Türkçe</option>
          <option value="Spanish">İspanyolca</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Min Puan:</label>
        <input
          type="number"
          min="0"
          max="10"
          step="0.1"
          value={state.filters.minRating}
          onChange={(e) => handleFilterChange("minRating", parseFloat(e.target.value) || 0)}
        />
      </div>

      <button
        className="clear-filters"
        onClick={() =>
          dispatch({
            type: ACTION_TYPES.SET_FILTERS,
            payload: { genre: "", language: "", minRating: 0 },
          })
        }
      >
        Filtreleri Temizle
      </button>
    </div>
  );
};

export default Filters;
