import { createSelector } from '@reduxjs/toolkit';

export const userSelector = (state) => state.user;
export const noticeSelector = (state) => state.notice;
export const cartSelector = (state) => state.cart;
