module.exports = async d => {
    const data = d.util.aoiFunc(d);
    const [ id, text, useEmbed = 'yes', useThumbnail = 'yes' ] = data.inside.splits;
    if (!id) return d.aoiError.fnError(d, 'custom', {}, `Missing user ID at [${data.inside.inside}]`);
    if (!text) return d.aoiError.fnError(d, 'custom', {}, `Missing string at [${data.inside.inside}]`);

    try {
        const user = await d.client.users.fetch(id);
        const result = text.replaceAll('{username}', user.username).replaceAll('{id}', user.id).replaceAll('{usertag}', user.discriminator !== "0" ? user.tag : "@" + user.username).replaceAll('{discriminator}', user.discriminator).replaceAll('{avatar}', user.avatarURL({size:4096,dynamic:true})).replaceAll('{bot}', user.bot).replaceAll('{creationDate}', new Date(user.createdTimestamp).toLocaleString('en-us', {timeZone: d.timezone})).replaceAll('{defaultAvatar}', user.defaultAvatarURL).replaceAll('{bannerColor}', user.hexAccentColor).replaceAll('{badges}', user.flags?.toArray().join(',') || 'none');
        if (useEmbed === 'yes') {
            if (!d.embeds[0]) d.embeds[0] = new d.embed();
            d.embeds[0].setDescription(result.addBrackets());
            if (useThumbnail === 'yes') {
                d.embeds[0].setThumbnail(user.avatarURL({size: 4096, dynamic: true}))
            }
        } else {
            data.result = result;
        } 
    } catch (e) {
        console.log(e)
        return d.aoiError.fnError(d, 'user', {inside: data.inside});
    };
    if (useEmbed === 'yes') {
        return {
            code: d.util.setCode(data),
            embeds: d.embeds,
        };
    } else {
        return {
            code: d.util.setCode(data)
        }
    }
}