module.exports = d => {
  const data = d.util.aoiFunc(d);
  const [message] = data.inside.splits;
  
  const emojiRegex = /(\s+)?([\u2700-\u27BF]|[\uD83C]|[\uDC00-\uDFFF]|\uD83D|[\uDC00-\uDE4F]|<a?:[\w]+:[\d]+>)/g;
  const modifiedText = message.replace(emojiRegex, function(match, space) {
    if (space && !/\S/.test(message.slice(message.indexOf(match) + match.length))) {
      return space.trim();
    } else {
      return "";
    };
  });
  
  data.result = modifiedText;
  
  return {
    code: d.util.setCode(data),
  };
}