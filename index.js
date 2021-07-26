#!/usr/bin/env node

const { Command } = require("commander");
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
      })

    // 增加日程
    program.command("add")
        .description('增加日程')
        .action(async (pk)=>{
             // todosth
            console.log('增加日程');
        })

    // 更新日程
    program.command("update [id]")
        .description( "更新日程")
        .action(async (id)=>{
            // todosth
            console.log('更新日程', id);
        })

    // 删除日程
    program.command("remove [id]")
        .description( "删除日程")
        .action(async (id)=>{
            // todosth
            console.log('删除日程', id);
        })

    // 解析环境参数，不要删除
    program.parse(process.argv);
  }
}


new Main().start();
