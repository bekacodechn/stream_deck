#!/usr/bin/env osascript -l JavaScript

/**
 * 插件 Mac Automation: Run JXA (Script)
 * Script Path: /Users/beka/Desktop/CODE/stream_deck/mouseClick.js
 * 参数用例:
 * Parameter: '{"x": 500, "y": 500, "action": "doubleClick", "delay": 20}'
 */

// 文件名: mainScript.js
// 描述: 主脚本，用于执行鼠标操作

ObjC.import('Foundation');

/**
 * 加载外部 JS 文件并返回其执行结果
 */
function loadScript(path) {
    var fm = $.NSFileManager.defaultManager;
    if (!fm.fileExistsAtPath($(path))) {
        throw new Error("无法找到脚本文件: " + path);
    }
    var data = $.NSString.stringWithContentsOfFileEncodingError($(path), $.NSUTF8StringEncoding, null);
    return eval(ObjC.unwrap(data));  // ⚠️ 这次会返回 createMouseLib 函数
}

// 加载库
var createMouseLib = loadScript("/Users/beka/Desktop/CODE/stream_deck/mouseClickLib.js");

// 创建库实例
var MouseLib = createMouseLib();

/**
 * 主运行函数，系统自动调用
 */
function run(argv) {
    try {
        // 将第一个参数解析为JSON对象
        var params = JSON.parse(argv[0]);
        var xPos = params.x;
        var yPos = params.y;
        var actionType = params.action;
        var delay = params.delay;

        MouseLib.executeMouseAction(xPos, yPos, actionType, delay);
        return "操作成功！";
    } catch (error) {
        return "JSON解析或执行错误: " + error.message;
    }
}
