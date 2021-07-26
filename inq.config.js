


module.exports  = ( defaultData ) => {
    const { 
        desc = '', 
        title = '', 
        startTime = 'MM-DD HH:MM', 
        endTime = 'MM-DD HH:MM' 
    } = defaultData || {}

    return [{
        type: 'input',
        message: `💁 请输入日程标题:`,
        name: "title",
        default: title,
    }, {
        type: 'input',
        message: `💁 请输入日程开始时间:`,
        name: "startTime",
        default: startTime,
    }, {
        type: 'input',
        message: `💁 请输入日程结束时间:`,
        name: "endTime",
        default: endTime,
    }, {
        type: 'input',
        message: `💁 请输日程描述`,
        name: "desc",
        default: desc,
    }]
}