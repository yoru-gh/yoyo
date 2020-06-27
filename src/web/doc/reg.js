const REG_URL = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])/; // 链接
const REG_URL2 = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
const REG_QQ = /^[1-9][0-9]{4,9}$/; // 最多 11 位 QQ 号
const REG_CHINESE = /^[^\u4e00-\u9fa5]{0,}$/; // 中文
const REG_NUMBER = /^[1-9](\d)*$/; // 开头不为 0 的正整数
const REG_NEMBER2 = /^\d+(\.\d+)?$/; // 可带小数点的数字
const REG_NUMBER3 = /^(?:\d+|\d{1,3})(?:\.\d{1,2})?$/; // 可带小数点的数字