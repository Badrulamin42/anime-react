import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface AnimeState {
  animeList: any[];
  selectedAnime: any | null;
  loading: boolean;
  searchQuery: string; // add this
}

const initialState: AnimeState = {
  animeList: [],
  selectedAnime: null,
  loading: false,
   searchQuery: "", // default empty
};

export const fetchAnimeList = createAsyncThunk('anime/fetchList', async (query: string) => {
  const res = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=10`);
  const data = await res.json();
  return data.data;
});

export const fetchAnimeDetail = createAsyncThunk('anime/fetchDetail', async (id: string) => {
  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
  const data = await res.json();
  return data.data;
});

const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    setSelectedAnime(state, action: PayloadAction<any>) {
      state.selectedAnime = action.payload;
    },
      setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAnimeList.pending, (state) => { state.loading = true; });
    builder.addCase(fetchAnimeList.fulfilled, (state, action) => {
      state.animeList = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAnimeDetail.pending, (state) => { state.loading = true; });
    builder.addCase(fetchAnimeDetail.fulfilled, (state, action) => {
      state.selectedAnime = action.payload;
      state.loading = false;
    });
  },
});

export const { setSelectedAnime, setSearchQuery} = animeSlice.actions;
export default animeSlice.reducer;
