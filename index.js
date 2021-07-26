#!/usr/bin/env node

const { Command } = require("commander");
const fs = require('fs');
const path = require('path');
const cache = require('./cache/index.json');
const inquirer = require("inquirer");
const moment = require('moment');
const program = new Command();
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
            const inqres = await inquirer.prompt([{
              type: 'input',
              message: `🎵请输日程描述:`,
              name: "desc"
            }])
            if (inqres.desc) {
              cache.push({
                "createTime": moment().format('YYYY-MM-DD HH:mm:ss'),
                "desc": inqres.desc
              })
              this.writeFile(cache);
            }
        })

    // 更新日程
    program.command("update [id] [desc]")
        .description( "更新日程")
        .action(async (id, desc)=>{
            // todosth
            console.log('更新日程', id, desc);
            const update_id = Number(id);
            cache.map((item, index) => {
              if (index === update_id) {
                return item.desc = desc;
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
