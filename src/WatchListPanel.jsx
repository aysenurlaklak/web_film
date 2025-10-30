import React from 'react';
import { useApp, ACTION_TYPES } from './Reducer';

const WatchListPanel = () => {
  const { state, dispatch } = useApp();

  const removeFromWatchlist = (showId) => {
    dispatch({ type: ACTION_TYPES.REMOVE_WATCHLIST, payload: showId });
  };

  const clearWatchlist = () => {
    dispatch({ type: ACTION_TYPES.CLEAR_WATCHLIST });
  };

  return (
    <div className="watchlist-panel">
      <div className="watchlist-header">
        <h3>Gösterime Girecekler ({state.watchlist.length})</h3>
        {state.watchlist.length > 0 && (
          <button onClick={clearWatchlist} className="clear-watchlist">
            Listeyi Temizle
          </button>
        )}
      </div>

      <div className="watchlist-items">
        {state.watchlist.length === 0 ? (
          <p className="empty-watchlist">Henüz dizi eklenmedi</p>
        ) : (
          state.watchlist.map(show => (
            <div key={show.id} className="watchlist-item">
              <img 
                src={show.image?.medium || '/placeholder-image.jpg'} 
                alt={show.name}
                className="watchlist-image"
              />
              <div className="watchlist-content">
                <h4>{show.name}</h4>
                <span className="rating">⭐ {show.rating?.average || 'N/A'}</span>
                <button 
                  onClick={() => removeFromWatchlist(show.id)}
                  className="remove-btn"
                >
                  Kaldır
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WatchListPanel;
