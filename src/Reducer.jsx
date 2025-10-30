import React, { createContext, useContext, useReducer, useEffect } from "react";

// Initial state
const initialState = {
  shows: [],
  loading: false,
  error: null,
  query: "friends",
  filters: {
    genre: "",
    language: "",
    minRating: 0,
  },
  watchlist: JSON.parse(localStorage.getItem("WatchLİstPanel")) || [],
  currentPage: 1,
  pageSize: 6,
  selectedShow: null,
  episodes: [],
};

// Action types
export const ACTION_TYPES = {
  FETCH_INIT: "FETCH_INIT",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_FAILURE: "FETCH_FAILURE",
  SET_QUERY: "SET_QUERY",
  SET_FILTERS: "SET_FILTERS",
  ADD_WATCHLIST: "ADD_WATCHLIST",
  REMOVE_WATCHLIST: "REMOVE_WATCHLIST",
  CLEAR_WATCHLIST: "CLEAR_WATCHLIST",
  SET_SELECTED_SHOW: "SET_SELECTED_SHOW",
  SET_EPISODES: "SET_EPISODES",
  SET_CURRENT_PAGE: "SET_CURRENT_PAGE",
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_INIT:
      return { ...state, loading: true, error: null };
    case ACTION_TYPES.FETCH_SUCCESS:
      return { ...state, loading: false, shows: action.payload };
    case ACTION_TYPES.FETCH_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ACTION_TYPES.SET_QUERY:
      return { ...state, query: action.payload, currentPage: 1 };
    case ACTION_TYPES.SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.payload }, currentPage: 1 };
    case ACTION_TYPES.ADD_WATCHLIST:
      if (state.watchlist.find((item) => item.id === action.payload.id)) return state;
      return { ...state, watchlist: [...state.watchlist, action.payload] };
    case ACTION_TYPES.REMOVE_WATCHLIST:
      return { ...state, watchlist: state.watchlist.filter((item) => item.id !== action.payload) };
    case ACTION_TYPES.CLEAR_WATCHLIST:
      return { ...state, watchlist: [] };
    case ACTION_TYPES.SET_SELECTED_SHOW:
      return { ...state, selectedShow: action.payload };
    case ACTION_TYPES.SET_EPISODES:
      return { ...state, episodes: action.payload };
    case ACTION_TYPES.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

// Context
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Watchlist’i localStorage’de sakla
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
  }, [state.watchlist]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};
