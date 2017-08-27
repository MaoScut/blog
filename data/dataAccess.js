let fs = require('fs');
let path = require('path');
function fetchAll(func) {
  const p = path.join(__dirname, 'database.json')
  fs.readFile(p, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    };
    // 只是返回字符串而已，转化为数组自己去搞
    func(data);
  })
}
console.log('hhh');
fetchAll((data) => console.log(JSON.parse(data)));