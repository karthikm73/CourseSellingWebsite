import {atom} from "recoil";

// // Update the userState atom definition
// const initialUserState = JSON.parse(localStorage.getItem('userState')) || {
//   isLoading: true,
//   adminEmail: null,
// };


export const userState = atom({
  key: 'userState',
  default: {
    isLoading: true,
    adminEmail: null,
  },
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newValue) => {
        localStorage.setItem('userState', JSON.stringify(newValue));
      });
    },
  ],
});
