import host from '../config/host';
const parseImg = function(url){
  var totalPath = host+url;
  return totalPath;
}
export default parseImg;
