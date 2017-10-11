#!/usr/bin/env node
const ncommand = require("ncommand");
const fs = require("fs");
const path = require("path");
const dir = path.parse(process.argv[1]).dir;
//扩展类
class extend {
    constructor(){

    }
    copyFilePath(FilePath) {
        //判断文件是否存在，如果不存在创建对应的文件夹
        FilePath = FilePath || "";
        if(!fs.existsSync(FilePath)){
            FilePath.split(path.sep).map(function (e,i,d) {
                var url = "";
                for(var j = 0 ; j < i;j++){
                    url += d[j]+"\\";
                }
                if(!fs.existsSync(url)){
                    fs.mkdir(url);
                };
            });
        };
        return this;
    }
}
class commandsExtend {
    constructor(){

    }
    To_min(readFileSyncData){
        return readFileSyncData.replace(/\s/img,"");
    }
    copyInit(filePath,pathData,type){
        var thist = this;
        pathData = pathData.map(function (e) {
            var mapFilePath = path.resolve(dir,e);
            newExtend.copyFilePath(mapFilePath);
            var readFileSyncData = fs.readFileSync(filePath,"utf8");
            fs.writeFileSync(mapFilePath, (function (t,thist,readFileSyncData) {
                if(t && typeof t == "string" && thist[t]){
                   return thist.To_min(readFileSyncData)
                }else {
                    return readFileSyncData;
                }
            })(type,thist,readFileSyncData));
            return mapFilePath;
        });
        return this;
    }
    copy(a,b,_this){
        var thist = this;
        if(b.length >= 2){
            var filePath = path.resolve(dir,b[0]);
            var pathData = b[1].replace(/^\[|\]$/img,"").split(",");
            if(!fs.existsSync(filePath)){
                _this.ERR(`文件不存在：${filePath}`);
            };
            if(b[2]){
                _this
                .Commands({
                    log:['-min',"压缩文件"],
                    callback:function (a,b) {
                        thist.copyInit(filePath,pathData,"To_min");
                    }
                })
                .init();
            }else {
                _this
                    .init(Function,function () {
                        thist.copyInit(filePath,pathData);
                    });
            }

        }else {
            _this.console
                .color(function () {
                    this
                        .log(`命令【${a[0]}】参数错误,例如：copy [-c] <`)
                        .info('filePath')
                        .log(`> <`)
                        .info('Array:[filePath,..]')
                        .log(`>`);
                })
        };
        return this;
    }
}
const newExtend = new extend();
const newCommandsExtend = new commandsExtend();
new ncommand()
    .Commands({
        log:['copy',"[-c]","<...info('filePath')>"," <...info('Array:[filePath,..]')>","拷贝文件到指定路径"],
        callback:function (a,b) {newCommandsExtend.copy(a,b,this);}
    })
    .Commands({
        log:['-c'],
        output:false,
        callback:function (a,b) { newCommandsExtend.copy(a,b,this);}
    })
    .init();

