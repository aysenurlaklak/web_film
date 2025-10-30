import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useApp, ACTION_TYPES } from "./Reducer";

const ShowDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const { selectedShow, episodes } = state;

  useEffect(() => {
    fetchShowDetail();
    fetchEpisodes();
  }, [id]);

  const fetchShowDetail = async () => {
    try {
      const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
      dispatch({ type: ACTION_TYPES.SET_SELECTED_SHOW, payload: response.data });
    } catch (error) {
      console.error("Error fetching show details:", error);
    }
  };

  const fetchEpisodes = async () => {
    try {
      const response = await axios.get(`https://api.tvmaze.com/shows/${id}/episodes`);
      dispatch({ type: ACTION_TYPES.SET_EPISODES, payload: response.data });
    } catch (error) {
      console.error("Error fetching episodes:", error);
    }
  };

  const addToWatchlist = () => {
    if (selectedShow) {
      dispatch({ type: ACTION_TYPES.ADD_WATCHLIST, payload: selectedShow });
    }
  };

  if (!selectedShow) {
    return <div className="loading">Yükleniyor...</div>;
  }

  return (
    <div className="show-detail">
      <button onClick={() => navigate("/")} className="back-button">
        ← Geri Dön
      </button>

      <div className="show-header">
        <img
          src={selectedShow.image?.original || selectedShow.image?.medium}
          alt={selectedShow.name}
          className="show-detail-image"
        />
        <div className="show-info">
          <h1>{selectedShow.name}</h1>
          <div className="show-meta">
            <span>⭐ {selectedShow.rating?.average || "N/A"}</span>
            <span>🏷️ {selectedShow.genres?.join(", ") || "Belirtilmemiş"}</span>
            <span>🗣️ {selectedShow.language}</span>
            <span>📅 {selectedShow.premiered}</span>
            <span>📺 {selectedShow.status}</span>
          </div>
          <div
            className="show-summary"
            dangerouslySetInnerHTML={{ __html: selectedShow.summary }}
          />
          <button onClick={addToWatchlist} className="btn-watchlist">
            Listeye Ekle
          </button>
        </div>
      </div>

      <div className="episodes-section">
        <h2>Bölümler ({episodes.length})</h2>
        <div className="episodes-list">
          {episodes.map((episode) => (
            <div key={episode.id} className="episode-card">
              <h4>{episode.name}</h4>
              <p>
                Sezon {episode.season} Bölüm {episode.number}
              </p>
              <span className="episode-date">
                {episode.airdate} • {episode.runtime} dakika
              </span>
              <div
                className="episode-summary"
                dangerouslySetInnerHTML={{ __html: episode.summary }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowDetail;
