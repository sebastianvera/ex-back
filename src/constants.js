module.exports = {
  LOGIN_PAGE_URL:
    'https://login.bancochile.cl/bancochile-web/persona/login/index.html#/login',
  USERNAME_SELECTOR: 'input[name="username2"]',
  PASSWORD_SELECTOR: 'input[name="userpassword"]',
  TRANSACTIONS_PAGE_URL:
    'https://portalpersonas.bancochile.cl/mibancochile-web/front/persona/index.html#/cuentas/movimientosCuenta',
  TRANSACTIONS_PAGINATOR_SELECTOR: 'ul.pagination-md',
  PAGES_SELECTOR: 'ul.pagination-md li a',
  NEXT_PAGE_SELECTOR: 'li:not(.disabled) a[ng-click="selectPage(page + 1)"]',
};
