import wepy from 'wepy'
import { connect, getStore } from 'wepy-redux';
import ServerAPI from '../server/ServerAPI';
import parseImg from '../util/parseImg';

const store = getStore()

export default class getEssay {

    static async getEssayByTitle(title) {
      let result = null;
      try {
        result = await ServerAPI.getEssayByTitle(title);
      } catch (e) {
        return null
      }
      if (result) {
        //将图片路径改为完整路径
        result.a_html= result.a_html.replace(/<p>/ig, `<p style='margin-bottom: 10px;color: #333;font-size: 32rpx;'>`);
        result.a_thumbnail = parseImg(result.a_thumbnail);
        return result;
      }
    }

    static async getEssay(name, num= 10) {
      let result = null;
      let state = store.getState();
      let cstate=state.storeEssay[name]
      let begin = cstate &&　cstate.length || 0;
      try {
        result = await ServerAPI.getEssayByTagName(name, begin, num);
      } catch (e) {
        return null
      }
      if (result) {

        //将图片路径改为完整路径
        result = result.map(item => {
          item.a_thumbnail = parseImg(item.a_thumbnail);
          return item;
        })
        store.dispatch({
          type: 'ADD_ESSAY',
          data: result,
          name
        })
        return result.length;
      }
    }

    static async getHotEssay(begin=0, num= 5) {
      let result = null;
      let name = 'hotEssay'
      let state = store.getState();
      let cstate=state.storeEssay[name]
      try {
        result = await ServerAPI.getHotEssay(begin, num);
      } catch (e) {
        return null
      }
      if (result) {

        //将图片路径改为完整路径
        result = result.map(item => {
          item.a_thumbnail = parseImg(item.a_thumbnail);
          return item;
        })
        store.dispatch({
          type: 'ADD_ESSAY',
          data: result,
          name
        })
        return result.length;
      }
    }

    static async getRandEssay(begin=0, num= 3) {
      let result = null;
      let name = 'guess'
      let state = store.getState();
      let cstate=state.storeEssay[name]
      try {
        result = await ServerAPI.getRandEssay(begin, num);
      } catch (e) {
        return null
      }
      if (result) {

        //将图片路径改为完整路径
        result = result.map(item => {
          item.a_thumbnail = parseImg(item.a_thumbnail);
          return item;
        })
        store.dispatch({
          type: 'SET_ESSAY',
          data: result,
          name
        })
        return result.length;
      }
    }

    static setReadHistory(){
      store.dispatch({
        type: 'SET_HISTORY',
      })
    }

    static addReadHistory(data){
      store.dispatch({
        type: 'ADD_HISTORY',
        data
      })
    }

    static clearReadHistory(){
      store.dispatch({
        type: 'CLEAR_HISTORY'
      })
    }

    static async getSearch(title, num){
      let result = null;
      let name = 'search-'+title
      let state = store.getState();
      let cstate=state.storeEssay[name]
      let begin = cstate &&　cstate.length || 0;
      try {
        result = await ServerAPI.getEssayByLikeTitle(title, begin, num);
      } catch (e) {
        return null
      }
      if (result) {

        //将图片路径改为完整路径
        result = result.map(item => {
          item.a_thumbnail = parseImg(item.a_thumbnail);
          return item;
        })
        store.dispatch({
          type: 'ADD_ESSAY',
          data: result,
          name
        })
        return result.length;
      }
    }
}
