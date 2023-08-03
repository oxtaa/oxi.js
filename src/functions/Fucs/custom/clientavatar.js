//added by oxta.
module.exports = async (d) => {
    data = d.util.aoiFunc(d);
    
    data.result = d.client.user.displayAvatarURL({
        size: 4096,
        dynamic: 'yes'
    });

    return {
        code: d.util.setCode(data)
    }
}