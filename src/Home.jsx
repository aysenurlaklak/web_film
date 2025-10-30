import TVlist from './TVlist'; 
import WatchListPanel from './WatchListPanel';
import SearchBox from './Search';
import Filters from './Filters';
import Pagination from './Pagination';
import { useApp, ACTION_TYPES } from './Reducer';
import axios from 'axios';
import React, { useEffect } from 'react';

const Home = () => {
  const { state, dispatch } = useApp();
  const { query, filters, currentPage, pageSize } = state;

  useEffect(() => {
    fetchShows();
  }, [query, filters, currentPage]);

  const fetchShows = async () => {
    dispatch({ type: ACTION_TYPES.FETCH_INIT });

    try {
      const response = await axios.get(
        `https://api.tvmaze.com/search/shows?q=${query}`
      );

      let filteredShows = response.data.map(item => item.show);

      if (filters.genre) {
        filteredShows = filteredShows.filter(show => 
          show.genres && show.genres.includes(filters.genre)
        );
      }

      if (filters.language) {
        filteredShows = filteredShows.filter(show => 
          show.language === filters.language
        );
      }

      if (filters.minRating > 0) {
        filteredShows = filteredShows.filter(show => 
          show.rating?.average >= filters.minRating
        );
      }

      dispatch({ type: ACTION_TYPES.FETCH_SUCCESS, payload: filteredShows });
    } catch (error) {
      dispatch({ type: ACTION_TYPES.FETCH_FAILURE, payload: error.message });
    }
  };

  const paginatedShows = state.shows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="home">
      <div className="container">
        <div className="header-section">
          <h1>Kampüs Film Kulübü</h1>
          <SearchBox />
          <Filters />
        </div>

        <div className="content-section">
          <div className="main-content">
            {state.loading && <div className="loading">Yükleniyor...</div>}
            {state.error && (
              <div className="error">
                Hata: {state.error}
                <button onClick={fetchShows}>Tekrar Dene</button>
              </div>
            )}
            {!state.loading && !state.error && state.shows.length === 0 && (
              <div className="empty">Sonuç bulunamadı</div>
            )}
            {!state.loading && !state.error && state.shows.length > 0 && (
              <>
                <TVlist shows={paginatedShows} />
                <Pagination 
                  totalItems={state.shows.length}
                  pageSize={pageSize}
                  currentPage={currentPage}
                />
              </>
            )}
          </div>

          <div className="sidebar">
            <WatchListPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
