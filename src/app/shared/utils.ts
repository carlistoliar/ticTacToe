export default class Utils {

  static componentFormat(obj) {
    const boardRows = Object.keys(obj);
    const rObj = {};
    for (let i = 0; i < boardRows.length; i++) {
      rObj[boardRows[i]] = Object.keys(obj[boardRows[i]]);
    }
    return rObj;
  }

}
