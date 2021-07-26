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
      .description( "测试命令2")
      .action(async (arg)=>{
          // todosth
          console.log(arg);
      })

    // 增加日程
    program.command("add")
        .description('测试命令1')
        .action(async (pk)=>{
             // todosth
            console.log('test1命令的参数:', pk);
        })

    // 更新日程
    program.command("update [arg]")
        .description( "测试命令2")
        .action(async (arg)=>{
            // todosth
            console.log(arg);
        })

    // 删除日程
    program.command("remove [arg]")
        .description( "测试命令2")
        .action(async (arg)=>{
            // todosth
            console.log(arg);
        })

    // 解析环境参数，不要删除
    program.parse(process.argv);
  }
}


new Main().start();
