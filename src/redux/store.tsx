import { configureStore  } from '@reduxjs/toolkit'
import tagSliceReducer from '../features/tags/tagsSlice'

export default configureStore({
  reducer: {
    tags: tagSliceReducer,
  },
})

