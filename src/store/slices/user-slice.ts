import { createSlice } from '@reduxjs/toolkit';

export const UserSlice = createSlice({
  name: 'user slice',
  initialState: {
    token: '',
    user: {},
  },
  reducers: {
    setToken(state, { payload }) {
      // console.log("payload", payload);
      state.token = payload;
    },

    testTokenNull(state) {
      console.log('token 不存在回到登陆页');
      state.token = '';
    },

    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

/**
 * @description 用户相关的操作
 */
export const userSlice = UserSlice.actions;

/**
 * @description 导出 reducer
 */
export default UserSlice.reducer;
