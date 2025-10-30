import React from "react";
import TVCard from "./TvCard";

const TVlist = ({ shows }) => {
  return (
    <div className="tv-list">
      {shows.map((show) => (
        <TVCard key={show.id} show={show} />
      ))}
    </div>
  );
};

export default TVlist;
