import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000",
});

const ticketsSlice = createSlice({
  name: "tickets",
  initialState: {
    tickets: [],
  },
  reducers: {
    setTickets: (state, action) => {
      state.tickets = action.payload;
    },

    addTicket: (state, action) => {
      state.tickets.push(action.payload);
    },

    deleteTicket: (state, action) => {
      state.tickets = state.tickets.filter(
        (ticket) => ticket.id !== action.payload
      );
    },

    updateTicket: (state, action) => {
      const index = state.tickets.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tickets[index] = action.payload;
      }
    },
  },
});

export const { setTickets, addTicket, deleteTicket } = ticketsSlice.actions;
export default ticketsSlice.reducer;
