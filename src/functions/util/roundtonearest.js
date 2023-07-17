// modified by oxta.
module.exports = async (d) => {
    data = d.util.aoiFunc(d);
    const [number] = data.inside.splits;

    const numlength = number.length;
    const num = parseInt(number);

    if (numlength > 2) {
      const exponent = Math.floor((numlength - 1) / 3);
      const divisor = 10 ** (exponent * 3);
      const roundedNum = Math.round(num / divisor) * divisor;
      const roundedEqual = roundedNum.toString().slice(0, - exponent) + "0".repeat(exponent);
      data.result = roundedEqual
    } else {
      data.result = num;
    };

    return {
        code: d.util.setCode(data)
    }
}