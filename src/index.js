// @flow
const puppeteer = require('puppeteer');
const {
  LOGIN_PAGE_URL,
  TRANSACTIONS_PAGE_URL,
  USERNAME_SELECTOR,
  PASSWORD_SELECTOR,
  TRANSACTIONS_PAGINATOR_SELECTOR,
  PAGES_SELECTOR,
  NEXT_PAGE_SELECTOR,
} = require('./constants');

const credentials = require('./credentials');

const gotoOptions = { waitUntil: 'networkidle', timeout: 15000 };

const login = async page => {
  await page.goto(LOGIN_PAGE_URL);
  const usernameInput = await page.$(USERNAME_SELECTOR);
  await usernameInput.type(credentials.username);
  const passwordInput = await page.$(PASSWORD_SELECTOR);
  await passwordInput.type(credentials.password);
  await passwordInput.press('Enter');
  const button = await page.$('.btn.success.btn-block');
  await button.click();
  await page.waitForNavigation(gotoOptions);
};

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    await login(page);
    const transactionRequests = [];
    page.on('response', async res => {
      if (res.url.endsWith('getcartola')) {
        const json = await res.json();
        transactionRequests.push(json);
      }
    });
    await page.goto(TRANSACTIONS_PAGE_URL, gotoOptions);
    await page.waitForSelector(TRANSACTIONS_PAGINATOR_SELECTOR);
    await page.waitForSelector(PAGES_SELECTOR, { visible: true });

    // Fetch at least 100 transactions
    const nextPage = await page.$(NEXT_PAGE_SELECTOR);
    if (nextPage) {
      await nextPage.click();
      await page.waitForNavigation(gotoOptions);
    }

    const transactions = transactionRequests.reduce(
      (ts, t) => ts.concat(...t.movimientos),
      []
    );
    console.log(JSON.stringify(transactions, null, 2)); // eslint-disable-line no-console
  } catch (e) {
    console.log('ERR', e); // eslint-disable-line no-console
  }

  await browser.close();
})();
