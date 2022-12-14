let a = false;
async function fetchPics(channel, numPics) {
    const picUrls = []
    let lastReqLength = 100
    let lastMsgID = 0
    while (picUrls.length <= numPics && lastReqLength === 100) {
        const messages = (await channel.fetchMessages({ limit: 100, before: lastMsgID })).array()
        if (!messages) { break }
        for (const message of messages) {
            picUrls.push(...getPicUrls(message))
        }
        lastReqLength = messages.length
        lastMsgID = messages.slice(-1)[0].id
    }
    return picUrls.length > numPics ? picUrls.slice(0, numPics) : picUrls
}

function getPicUrls(message) {
    const urls = []
    let newurl=null;
    try {
        newurl=Object.values(message.embeds[0].image.url).join("");
    } catch (error) {
        newurl="Unable to fetch URL";
    }
        
        if(newurl!=null)
        {
            console.log(newurl);
            urls.push(newurl);
        }

    
    /*for (const { height, width, url } of message.attachments.array()) {
        // Width and height verify that the attachment is an image 
        if (width && height) { urls.push(url) }
    }*/

    //if var notnull, return url
    return urls
}

module.exports = fetchPics
