import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TagsState {
  tags: string[];
}

const initialState: TagsState = {
  tags: []
};

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTag : (state, action: PayloadAction<string>) => {
      state.tags.push(...action.payload)
    },
    removeTag: (state) => {
      state.tags.pop();
    }
    // removeTag: (state, action: PayloadAction<string>) => {
    //   const index = state.tags.indexOf(action.payload);
    //   if (index !== -1) {
    //     state.tags.splice(index, 1); // Remove the tag from the array
    //   }
    // }
  },
})

export const { addTag, removeTag } = tagsSlice.actions

export default tagsSlice.reducer