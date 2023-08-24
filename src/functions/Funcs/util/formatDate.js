const formatDate = require("../../../handler/FormatDate");
module.exports = (d) => {
  const data = d.util.aoiFunc(d);
  const [ date, format = 'dddd, DD MMMM YYYY', toLow = 'no' ] = data.inside.splits
  if (data.err) return d.error(data.err);

  const isValidDate = new Date(isNaN(Number(date)) ? date : Number(date));

  if (isNaN(isValidDate.getTime())) return d.aoiError.fnError(d, 'custom', {}, `Invalid date in [${data.inside.inside}]`);

  const res = d.command.code.replaceLast(`$formatDate${d.command.code.split('$formatDate')[d.command.code.split('$formatDate').length - 1].after()}`, format.replace(/\w+/g, (value) => formatDate(value, isValidDate, d.timezone)));

  data.result = useLowCase(res, toLow);

  function useLowCase(text, yon) {
    if (yon === 'yes') {
      return text.toLowerCase();
    } else if (yon === 'no') {
      return text;
    } else {
      return d.aoiError.fnError(d, 'custom', {}, `Invalid option at [${data.inside.inside}]`);
    }
  };

  return {
    code: d.util.setCode(data)
  };
};