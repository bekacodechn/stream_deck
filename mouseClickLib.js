// 文件名: mouseClickLib.js
// 描述: 鼠标操作库 (JXA安全作用域版)

ObjC.import('CoreGraphics');

function createMouseLib() {
    function executeMouseAction(x, y, clickType, delay) {
        var targetX = x;
        var targetY = y;
        var clickDelay = (delay !== undefined) ? delay : 20;

        var moveEvent = $.CGEventCreateMouseEvent(
            null,
            $.kCGEventMouseMoved,
            { x: targetX, y: targetY },
            $.kCGMouseButtonLeft
        );
        $.CGEventPost($.kCGHIDEventTap, moveEvent);

        if (clickType === 'click') {
            performClick(targetX, targetY);
        } else if (clickType === 'doubleClick') {
            performDoubleClick(targetX, targetY, clickDelay);
        } else {
            throw new Error('未知点击类型: ' + clickType);
        }
    }

    function performClick(x, y) {
        var downEvent = $.CGEventCreateMouseEvent(
            null,
            $.kCGEventLeftMouseDown,
            { x: x, y: y },
            $.kCGMouseButtonLeft
        );
        $.CGEventPost($.kCGHIDEventTap, downEvent);

        var upEvent = $.CGEventCreateMouseEvent(
            null,
            $.kCGEventLeftMouseUp,
            { x: x, y: y },
            $.kCGMouseButtonLeft
        );
        $.CGEventPost($.kCGHIDEventTap, upEvent);
    }

    function performDoubleClick(x, y, delay) {
        performClick(x, y);
        $.NSThread.sleepForTimeInterval(delay / 1000);
        performClick(x, y);
    }

    return {
        executeMouseAction: executeMouseAction
    };
}

// ✅ 最后必须显式返回函数引用，让 eval() 能拿到它
createMouseLib;
