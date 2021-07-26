#!/usr/bin/env node

const { Command } = require("commander");
const program = new Command();
const fs = require('fs');
const path = require('path');
const cache = require('./cache/index.json');
class Main {
   start() {
    // 版本
    program
      .version(require("./package.json").version)
      .option("-v, --version", "查看当前版本");
    
    // 查询日程
    program.command("search")
      .description( "查询日程")
      .action(async (arg)=>{
          // todosth
          console.log('查询日程');
          console.table(cache);
      })

    // 增加日程
    program.command("add")
        .description('增加日程')
        .action(async (pk)=>{
            console.info('增加日程');
            cache.push({
              "createTime": "2021-07-26 00:00:00",
              "startTime": "2021-07-26 00:00:00",
              "endTime": "2021-07-28 00:00:00",
              "des": "这是一段描述"
            })
            this.writeFile(cache);
        })

    // 更新日程
    program.command("update [id] [des]")
        .description( "更新日程")
        .action(async (id, des)=>{
            // todosth
            console.log('更新日程', id, des);
            const update_id = Number(id);
            cache.map((item, index) => {
              if (index === update_id) {
                return item.des = des;
              }
            })
            this.writeFile(cache);
        })

    // 删除日程
    program.command("remove [id]")
        .description( "删除日程")
        .action(async (id)=>{
            // todosth
            console.log('删除日程', id);
            const update_id = Number(id);
            cache.splice(update_id, 1);
            this.writeFile(cache);
        })

    // 解析环境参数，不要删除
    program.parse(process.argv);
  }
  writeFile(file) {
    try {
      fs.writeFileSync(path.resolve(__dirname, './cache/index.json'), JSON.stringify(file, null, 4));
    } catch (e) {
      console.error('🎵日程添加失败，你个完犊子怂货！！！');
      process.exit();
    }
  }
}


new Main().start();
