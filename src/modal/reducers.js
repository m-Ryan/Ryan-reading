import {
  combineReducers
} from 'redux';
const SET_USER='SET_USER';
const SET_ESSAY='SET_ESSAY';
const ADD_ESSAY='ADD_ESSAY';
const SET_SEARCH='SET_SEARCH';
const ADD_SEARCH='ADD_SEARCH';
const ADD_HISTORY='ADD_HISTORY';
const SET_HISTORY='SET_HISTORY';
const CLEAR_HISTORY='CLEAR_HISTORY';

function storeUser(state = [], action) {
  switch (action.type) {
      case SET_USER:
          return action.data;
      default:
          return state;
  }
}

function storeEssay(state = {}, action) {
  const { name, data, type } = action;
  switch (type) {
      case ADD_ESSAY:
        if(!state[name]) state[name] = []
        state[name]=state[name].concat(data);
        return {...state};
      case SET_ESSAY:
        if(!state[name]) state[name] = []
        state[name]=data;
        return {...state};
      default:
          return state;
  }
}

function storeSearch(state = {}, action) {
  const { name, data, type } = action;
  switch (type) {
      case ADD_SEARCH:
        if(!state[name]) state[name] = []
        state[name]=state[name].concat(data);
        return {...state};
      case SET_SEARCH:
        if(!state[name]) state[name] = []
        state[name]=data;
        return {...state};
      default:
          return state;
  }
}

function storeReadHistory(state = [], action) {
  const { type, data } = action;
  switch (type) {
    case SET_HISTORY:
      let initState = null;
      try {
        initState = JSON.parse(wx.getStorageSync('readHistory'))
      } catch (e) {}
      initState = Array.isArray(initState)?initState:[]
     return [...initState];
    case ADD_HISTORY:
      //如果已经存了，就删除加添加
      state=state.filter(item=>item.a_title !== data.a_title);

      state.unshift(data);
      if(state.length>30) state.shift();
      try {
        wx.setStorageSync('readHistory', JSON.stringify(state))
      } catch (e) {}
      return [...state];
    case CLEAR_HISTORY:
    try {
      wx.removeStorageSync('readHistory')
    } catch (e) {
      // Do something when catch error
    }
      return [];
    default:
        return state;
  }
}


const reduceData = combineReducers({
  storeUser,
  storeEssay,
  storeReadHistory,
  storeSearch
})

export default reduceData
