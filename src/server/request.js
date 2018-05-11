
import wepy from 'wepy';

const request = async function(url, header){
  let result = null;
  try{
    result = await wepy.request({url,header});
    if(result.statusCode === 200 && result.data.code ===200){
      return result.data.data
    }
    return false;
  }catch(e){
    return e;
  }
}
export default request;
