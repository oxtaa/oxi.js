module.exports = d => {
    const data = d.util.aoiFunc(d);
    const msg = d.message;
    const attachment = msg.attachments.first();

    if (attachment.contentType.includes('image')) {
      try {
        data.result = attachment.width.toString();
      } catch (e) {
        return d.aoiError.fnError(d, 'custom', {}, 'Unexpected error.');
      };
    };

    return {
        code: d.util.setCode(data)
    };
}