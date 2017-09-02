const fs = require('fs');
const path = require('path');

function fetchAll(func) {
  const p = path.join(__dirname, 'article.json');
  fs.readFile(p, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    // 只是返回字符串而已，转化为数组自己去搞
    func(data);
  });
}
function readAndWrite() {
  // const p = path.join(__dirname, 'article.json');  
  // fs.open(p, 'rw', (err, fd) => {
  //   if (err) {
  //     console.log(err);
  //     return;
  //   }
  //   fs.read(fd, 'utf8', (err, data) => {
  //     if (err) {
  //       console.log(err);
  //       // return;
  //     }
  //     const orginArr = JSON.parse(data);
  //     fs.write(fd,)
  //   })
  // })
  const p = path.join(__dirname, 'article.json');
  fs.readFile(p, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    // 只是返回字符串而已，转化为数组自己去搞
    const originArr = JSON.parse(data);
    const newData = JSON.stringify(originArr.concat({
      articleId: '4444442',
      title: 'mytitle2',
      content: 'content2',
      ownerId: '4444432',
      articleType: 'nature',
    }));
    fs.writeFile(p, newData, (e) => {
      if (e) console.log(e);
      fs.readFile(p, 'utf8', (er, d) => {
        if (e) {
          console.log(e);
        }
        console.log(JSON.parse(d).length);
      });
    });
  });
}
console.log('hhh');
// fetchAll((data) => console.log(JSON.parse(data)));
readAndWrite();
