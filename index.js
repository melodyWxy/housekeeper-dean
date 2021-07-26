#!/usr/bin/env node

const { Command } = require("commander");
const fs = require('fs');
const path = require('path');
const cache = require('./cache/index.json');
const inquirer = require("inquirer");
const getInqConfig = require('./inq.config');
const chalk = require('chalk');


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
      .action( async ()=>{
          // todosth
          if(!cache.length){
            console.log(chalk.yellow('💁 您暂时没有任何日程,请执行dean add命令添加日程!'));
            return ;
          }
          console.log(chalk.blue('💁 为您展示日程列表:'));
          const list = (cache||[]).map(item => ({
            "日程标题": item.title,
            "日程起止时间": `${item.startTime} / ${item.endTime}`,
            "日程描述":  item.desc
          }))
          console.table(list);
      })

    // 增加日程
    program.command("add")
        .description('添加日程')
        .action(async ()=>{
            console.info(chalk.blue('💁 添加日程'));
            const defaultData = {
              title: `日程${cache.length}`
            }
            const inqres = await inquirer.prompt(getInqConfig(defaultData))
            cache.push({
              ...inqres,
              createTime: Date.now()
            });
            this.writeFile(cache);
            console.info(chalk.green("💁 日程添加成功!"));
        })

    // 更新日程
    program.command("update <index>")
        .description( "更新日程")
        .action(async (index)=>{
            // todosth
            const update_id = Number(index);
            if((!update_id && (update_id !== 0)) || update_id < 0 || update_id >= cache.length){
              console.error("💁 参数无效!");
              return
            }
            console.log(chalk.blue('💁 更新日程'));
            const defaultData = cache[index];
            const inqres = await inquirer.prompt(getInqConfig(defaultData))
            cache[index] = {
              ...defaultData,
              ...inqres
            };
            this.writeFile(cache);
            console.info(chalk.green("💁 日程更新成功!"));
        })

    // 删除日程
    program.command("remove <index>")
        .description( "删除日程")
        .action(async (id)=>{
            // todosth
  
            const update_id = Number(id);
            if((!update_id && (update_id !== 0)) || update_id < 0 || update_id >= cache.length){
              console.error("💁 参数无效!");
              return
            }
            console.log(chalk.blue('💁 删除日程中……'));
            cache.splice(update_id, 1);
            this.writeFile(cache);
            console.log(chalk.green("💁 日程删除成功!"));
        })

    // 解析环境参数，不要删除
    program.parse(process.argv);
  }
  writeFile(file) {
    try {
      fs.writeFileSync(path.resolve(__dirname, './cache/index.json'), JSON.stringify(file, null, 4));
    } catch (e) {
      console.error(e);
      console.error('💁 日程写入失败。');
      process.exit();
    }
  }
}


new Main().start();
