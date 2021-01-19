1、h5页面和rn的交互，通过postmessage
function awaitPostMessage() {
        var isReactNativePostMessageReady = false;
        var queue = [];
        var currentPostMessageFn = function store(message) {
            queue.push(message);
        };
        if (!isReactNativePostMessageReady) {
            Object.defineProperty(window, "postMessage", {
            configurable: true,
            enumerable: true,
            get() {
                return currentPostMessageFn;
            },
            set(fn) {
                currentPostMessageFn = fn;
                isReactNativePostMessageReady = true;
                setTimeout(sendQueue, 0);
            }
            });
        }

        function sendQueue() {
            while (queue.length > 0) window.postMessage(queue.shift());
        }
    }
    awaitPostMessage();
    window.postMessage('index1111');
    window.postMessage('index2222');