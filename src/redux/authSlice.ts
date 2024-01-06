const { createSlice } = require("@reduxjs/toolkit");
type State = {
  isLogin: boolean;
  userId: string;
  nickname: string;
};
type Payload = {
  accessToken: string;
  avatar: string | null;
  nickname: string;
  userId: string;
  success: boolean;
};
type Action = {
  type: string;
  payload: Payload;
};

const initialState = {
  isLogin: !!localStorage.getItem("accessToken"),
  userId: localStorage.getItem("userId"),
  nickname: localStorage.getItem("nickname"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state: State, action: Action) => {
      const { accessToken, nickname, userId } = action.payload;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userId", userId);
      localStorage.setItem("nickname", nickname);
      state.isLogin = true;
      state.nickname = nickname;
      state.userId = userId;
    },
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
