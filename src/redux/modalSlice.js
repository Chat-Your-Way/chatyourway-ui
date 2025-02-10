import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  text: '',
  callback: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.text = action.payload.text;
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.text = '';
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice;
