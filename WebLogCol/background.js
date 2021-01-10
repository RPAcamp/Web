//console.log("background.js");

let browserInfo = [];
let userActionInfo = [];

chrome.runtime.onMessage.addListener(function(message, sender1, sendResponse){
    //sendResponse('Hello from background.');

    const { sender, data } = message;
    switch(sender) {
        case 'content':
            userActionInfo.push(...data);
            sendResponse("content received")
            break;
        case 'browser': 
            browserInfo.push(...data);
            sendResponse("browser received")
            break;
        case 'exportall': 
            sendResponse({
                data: {
                    browserInfo,
                    userActionInfo,
                },
                cmd: 'exportall',
            })
            break;
        case 'exportlatest': 
            sendResponse({
                data: {
                    browserInfo,
                    userActionInfo,
                },
                cmd: 'exportall',
            })
            break;
        default: 
            break;
    }
});



