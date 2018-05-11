import request from './request'
import host from '../config/host';
class ServerAPI {

  static postHeaders(args){
    let {token} = args;
    return {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
         Authorization: token,
    },
    method: 'POST',
    body:JSON.stringify({...args})
    }
  }

  static getHeaders(token){
    return {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
         Authorization: token,
    },
    method: 'GET',
    }
  }

      /**************   美文阅读api  ***************/
      static getEssayByTagName(tagName, begin, num){
        return request(host+`/get_essay_by_tag_name?tagName=${tagName}&begin=${begin}&num=${num}`,this.getHeaders());
      }

      static getEssayByLikeTitle(titleName, begin, num){
        return request(host+`/get_essay_like_title?titleName=${titleName}&begin=${begin}&num=${num}`,this.getHeaders());
      }

      static getEssayById(id){
        return request(host+`/get_essay_by_id?id=${id}`,this.getHeaders());
      }
      static getEssayByTitle(titleName){
        return request(host+`/get_essay_by_title?titleName=${titleName}`,this.getHeaders());
      }

      static getEssayCountByTagName(tagName){
        return request(host+`/get_essay_count_by_tag_name?tagName=${tagName}`,this.getHeaders());
      }

      static getEssayCountByLikeTitle(titleName){
        return request(host+`/get_essay_count_like_title?titleName=${titleName}`,this.getHeaders());
      }

      static getHotEssay(begin, num){
        return request(host+`/get_hot_essay?begin=${begin}&num=${num}`,this.getHeaders());
      }

      static getRandEssay(begin, num){
        return request(host+`/get_rand_essay?begin=${begin}&num=${num}`,this.getHeaders());
      }
      static getNewEssay(begin, num){
        return request(host+`/get_new_essay?begin=${begin}&num=${num}`,this.getHeaders());
      }



}

export default ServerAPI;

 /**************   美文阅读api  ***************/
