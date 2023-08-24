const axios = require('axios');
module.exports = async d => {
    const data = d.util.aoiFunc(d);
    const [ id = d.author?.id ] = data.inside.splits;

    const user = (id === d.author?.id) ? d.author : (await d.util.getUser(d, id));
    if (!user) return d.aoiError.fnError(d, 'user', {inside: data.inside});

    const headers = {
        Authorization: `Bot ${d.client.token}`
    };

    try {
        const userData = await axios.get(`https://discord.com/api/v9/users/${id}`, { headers });
        const globalName = userData.data.global_name;
        if (globalName) {
            data.result = globalName;
        } else {
            data.result = user.username;
        };
    } catch (e) {
        return d.aoiError.fnError(d, 'user', {inside: data.inside});
    };

    return {
        code: d.util.setCode(data)
    };
}