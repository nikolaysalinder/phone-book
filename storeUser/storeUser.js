const puppeteer = require("puppeteer");
const fs = require("fs");
const data = JSON.parse(fs.readFileSync("db-1605086283177.json", "utf8"));

// puppeteer options
const opts = {
  headless: false,
  slowMo: 300,
  timeout: 60000,
  args: ["--disable-notifications"],
};

(async () => {
  let browser = await puppeteer.launch(opts);
  page = await browser.newPage();
  await page.goto("localhost:8080/login", { waitUntil: "networkidle0" });

  await page.type("#email", "test@test.ru");
  await page.type("#pass", "123456");

  await page.click("#loginButton");
  await page.waitForNavigation({ waitUntil: "networkidle2" });

  for (let i = 0; i < data.length; i++) {
    await page.goto("localhost:8080/newuser", { waitUntil: "networkidle2" });
    console.log("_________________________________>" + i);
    await page.type("#imgUrl", data[i].imgUrl);
    await page.type("#lastName", data[i].lastName);
    await page.type("#firstName", data[i].firstName);
    await page.type("#email", data[i].email);
    await page.type("#phone", data[i].phone);

    await page.click("#buttonSubmit");

    await page.goto("localhost:8080/", { waitUntil: "networkidle2" });
  }

  browser.close();
})();
