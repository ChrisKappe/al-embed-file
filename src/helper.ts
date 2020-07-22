
export class Helper {
  static splitByLength(str: string, len: number) {
    var ret: Array<string> = [];
    for (var offset = 0, strLen = str.length; offset < strLen; offset += len) {
      ret.push(str.slice(offset, len + offset));
    }
    return ret;
  }
}
