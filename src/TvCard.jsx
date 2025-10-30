import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp, ACTION_TYPES } from "./Reducer";

const TVCard = ({ show }) => {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();

  const handleAddToWatchlist = () => {
    dispatch({ type: ACTION_TYPES.ADD_WATCHLIST, payload: show });
  };

  const handleShowDetail = () => {
    navigate(`/show/${show.id}`);
  };

  const isInWatchlist = state.watchlist.some((item) => item.id === show.id);

  return (
    <div className="tv-card">
      <img
        src={show.image?.medium || "/placeholder-image.jpg"}
        alt={show.name}
        className="tv-card-image"
      />
      <div className="tv-card-content">
        <h3>{show.name}</h3>
        <div className="tv-card-meta">
          <span>Tür: {show.genres?.join(", ") || "Belirtilmemiş"}</span>
          <span>Dil: {show.language}</span>
          <span>Puan: {show.rating?.average || "N/A"}</span>
        </div>
        <p className="tv-card-summary">
          {show.summary?.replace(/<[^>]*>/g, "").substring(0, 100)}...
        </p>
        <div className="tv-card-actions">
          <button onClick={handleShowDetail} className="btn-detail">
            Detay
          </button>
          <button
            onClick={handleAddToWatchlist}
            disabled={isInWatchlist}
            className="btn-watchlist"
          >
            {isInWatchlist ? "Listede" : "Listeye Ekle"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TVCard;
