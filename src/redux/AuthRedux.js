import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import CryptoJS from 'crypto-js';

/* ------------- Types and Action Creators ------------- */

export const {Types, Creators} = createActions({
  register: ['data'],
  login: ['data'],
  logout: ['data'],
  addTask: ['data'],
});

/* ------------- Initial State ------------- */
const date = new Date();
const initialTasks = [
  {
    title: 'Meeting with Iwan',
    date: new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      8,
      0,
      0,
    ),
  },
  {
    title: 'Running with George',
    date: new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      9,
      0,
      0,
    ),
  },
  {
    title: 'Designing with Bellamy',
    date: new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      10,
      0,
      0,
    ),
  },
  {
    title: 'Lunch Break',
    date: new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      12,
      0,
      0,
    ),
  },
  {
    title: 'Implementing Design',
    date: new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      13,
      0,
      0,
    ),
  },
  {
    title: 'Assessment Employee',
    date: new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      15,
      0,
      0,
    ),
  },
  {
    title: 'Speeding Internet',
    date: new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      17,
      0,
      0,
    ),
  },
];
const encryptedInitialTasks = CryptoJS.AES.encrypt(
  JSON.stringify(initialTasks),
  'vocatest',
).toString();

export const INITIAL_STATE = Immutable({
  isLoggedIn: false,
  username: null,
  email: null,
  tasks: encryptedInitialTasks,
});

/* ------------- Reducers ------------- */

// Register
export const register = (state, action) => {
  const {data} = action;
  return state.merge({
    username: data.username,
    email: data.email,
    isLoggedIn: true,
  });
};

// Login
export const login = (state, action) => {
  const {data} = action;
  return state.merge({
    email: data.email,
    isLoggedIn: true,
  });
};

// add task
export const addTask = (state, action) => {
  const {data} = action;
  const decryptedData = JSON.parse(
    CryptoJS.AES.decrypt(data, 'vocatest').toString(CryptoJS.enc.Utf8),
  );
  const decryptedState = JSON.parse(
    CryptoJS.AES.decrypt(state.tasks, 'vocatest').toString(CryptoJS.enc.Utf8),
  );
  const arr = [decryptedData, ...decryptedState];
  const comparator = (a, b) => {
    if (a.date > b.date) {
      return 1;
    } else if (a.date < b.date) {
      return -1;
    } else {
      return 0;
    }
  };
  arr.sort((a, b) => comparator(a, b));
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(arr),
    'vocatest',
  ).toString();
  return state.merge({
    tasks: encrypted,
  });
};

// logout
export const logout = state =>
  state.merge({
    isLoggedIn: false,
  });

/* ------------- Hookup Reducers To Type ------------- */

export const authReducer = createReducer(INITIAL_STATE, {
  // register
  [Types.REGISTER]: register,

  // login
  [Types.LOGIN]: login,

  // add task
  [Types.ADD_TASK]: addTask,

  // logout
  [Types.LOGOUT]: logout,
});
