import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import tagSliceReducer from '../features/tags/tagsSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    tags: tagSliceReducer,
  },
})