// modified by oxta.
module.exports = async d => {
    const data = d.util.aoiFunc(d);

    const [userID = d.author?.id] = data.inside.splits;

    const user = (userID === d.author?.id) ? d.author : (await d.util.getUser(d, userID));
    if (!user) return d.aoiError.fnError(d, 'user', {inside: data.inside});
    
    if (user.discriminator === "0") {
        data.result = "@" + user.username
    } else {
        data.result = user.tag;
    }

    return {
        code: d.util.setCode(data)
    }
}