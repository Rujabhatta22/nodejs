//importing packages
const date_fns = require('date-fns')
const uuid = require('uuid')
const fs = require('fs')


let uid = uuid.v4()
let date1 = date_fns.format(new Date(), 'yyyy/mm/dd\tHH:mm:ss')

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
readline.question('Enter your message: ', msg => {
    readline.close();
    writelogtoFile(uid, date1, msg)
});

const writelogtoFile = (uid, date1, msg) => {
    fs.appendFile('log.txt', ('uid:' + uid + '\tdate:' + date1 + '\tmessage:' + msg), (err) => {
        if (err) {
            console.log('ERROR')
        }
    });
}