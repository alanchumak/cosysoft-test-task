import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import Joke from './Joke'

interface JokesState {
  jokes: Array<Joke>,
  readingList: Array<Joke>,
    status: string,
    error: null | string
}

const initialState: JokesState = {
    jokes: [],
    readingList: [],
    status: 'idle',
    error: null
  }

export const jokesSlice = createSlice({
  name: 'jokes',
  initialState,
  reducers: {
    jokesFetchedFulfilled(state, action: PayloadAction<Array<Joke>>) {
      state.status = 'succeeded';
      state.jokes = action.payload
    },
    jokesFetchedFailed(state, action: PayloadAction<string>) {
      state.status = 'failed'
      state.error = action.payload
    },
    fetchJokes(){},
    jokeSavedToReadingList(state, action: PayloadAction<number>) {
      const id = action.payload
      const joke = state.jokes.find(item => item.id == id) as Joke

      const existJoke = state.readingList.find(item => item.id == joke.id) as Joke
      // console.log(existJoke.id == joke.id)
      if (!existJoke)
        state.readingList.push(joke)
      // state.readingList[id] = state.jokes[id]
    },
    jokeRemovedFromReadingList(state, action: PayloadAction<number>) {
      const id  = action.payload
      const joke = state.readingList.find(item => item.id == id) as Joke
      const index = state.readingList.indexOf(joke) 
      state.readingList.splice(index, 1)
      // state.readingList.push(joke)
      // delete state.readingList[id]
    }

  },

});

export const { fetchJokes, jokesFetchedFulfilled, jokesFetchedFailed,
  jokeSavedToReadingList, jokeRemovedFromReadingList } = jokesSlice.actions

export const selectTenJokes = (state: RootState) => state.jokes.jokes
export const selectReadingList = (state: RootState) => state.jokes.readingList

export default jokesSlice.reducer;
