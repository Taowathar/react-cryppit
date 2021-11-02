export const timeConverter = (unixTime) => {
  var date = new Date(unixTime).toLocaleDateString("zh-Hans-CN");
  return date.toString();
};
