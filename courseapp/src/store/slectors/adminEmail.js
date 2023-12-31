import { userState } from "../atoms/user.js";
import {selector} from "recoil";

export const userEmailState = selector({
  key: 'userEmailState',
  get: ({get}) => {
    const state = get(userState);
    console.log(state);

    return state.adminEmail;
  },
});