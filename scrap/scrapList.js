const puppeteer = require('puppeteer')
const fs = require('fs');

const scrapingLost = async (url) => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);

    const imgList = await page.evaluate(()=>{
        const nodeList = document.querySelectorAll('article img');
  
        const imgArray = [...nodeList]
  
        const imgList = imgArray.map(({src})=> ({src}))
  
        return imgList
    });

    fs.writeFileSync('insta.json', await JSON.stringify(imgList, null, 2), err=>{
        if(err) throw new Error('Erro');
        console.log('Ok')
    })
  
    await browser.close();
}

module.exports = scrapingLost