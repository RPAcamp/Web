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
            sendMsg();
            break;
        case 'exportlatest': 
            sendResponse({
                data: {
                    browserInfo,
                    userActionInfo,
                },
                cmd: 'exportall',
            })
            sendMsg();
            break;
        default: 
            break;
    }
});

// function sendMsg() {
// 
//     // userActionInfo browserInfo就是要传送的数据
//     sendNativeMessage(JSON.stringify({
//         userActionInfo, 
//         browserInfo
//     }));
// }

function sendMsg()
{
    var ws = new WebSocket("ws://localhost:40411/echo");

    ws.onmessage = function(evt){
        var received_msg = evt.data;
        console.log("Server:" + evt.data);
    }
    ws.onclose = function(){
    }
    ws.onopen = function()
    {
        ws.send(userActionInfo);
        ws.send(browserInfo);
    }
}



