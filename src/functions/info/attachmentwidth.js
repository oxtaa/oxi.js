// added by oxta.
module.exports = async (d) => {
    data = d.util.aoiFunc(d);
    const msg = d.message
    const attachment = msg.attachments.first();

    if (attachment.contentType.includes('image')) {
      data.result = attachment.height.toString();
    }

    return {
        code: d.util.setCode(data)
    }
}