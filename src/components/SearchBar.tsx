import React, { useState, useEffect } from "react";
import { TextField, InputAdornment, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnimeList, resetAnimeList, setSearchQuery } from "../slices/animeSlice";
import { AppDispatch, RootState } from "../store";

const SearchBar: React.FC = () => {
  const query = useSelector((state: RootState) => state.anime.searchQuery);
  const dispatch = useDispatch<AppDispatch>();
  

  useEffect(() => {
    const handler = setTimeout(() => {
          dispatch(resetAnimeList());
         dispatch(fetchAnimeList({ query, page: 1 }));
    }, 250); // debounce

    return () => clearTimeout(handler);
  }, [query, dispatch]);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 1,
        display: "flex",
        alignItems: "center",
        borderRadius: 1,
        mb: 2,
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for an anime..."
        value={query}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="primary" />
            </InputAdornment>
          ),
        }}
      />
    </Paper>
  );
};

export default SearchBar;
