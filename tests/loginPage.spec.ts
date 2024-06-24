import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { loginErrorMessages } from "../utils/loginErrorMessages";

test.describe("Acessar aplicação", async () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
  });

  test("Cenário 1: Acessar a pagina de login e verificar os campos", async () => {
    await loginPage.verificarLoginPageElementos();
  });

  test("Cenário 2: Login com sucesso para o usuário padrão (standard_user)", async () => {
    await loginPage.login(process.env.STANDARD_USER, process.env.PASSWORD);
  });

  test("Cenário 3: Login com falha para o usuário bloqueado (locked_out_user)", async () => {
    await loginPage.login(process.env.LOCKED_OUT_USER, process.env.PASSWORD);
    await loginPage.errorLoginMessage(loginPage.elements.loginError, loginErrorMessages.blockUser);
  });

  test("Cenário 4: Login com sucesso para o usuário com problemas (problem_user)", async () => {
    await loginPage.login(process.env.PROBLEM_USER, process.env.PASSWORD);
  });

  // Novo Cenário 5: Login com sucesso para o usuário com falha de desempenho (performance_glitch_user)
  test("Cenário 5: Login com sucesso para o usuário com falha de desempenho (performance_glitch_user)", async () => {
    await loginPage.login(process.env.PERFORMANCE_GLITCH_USER, process.env.PASSWORD);
    await expect(loginPage.page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  // Novo Cenário 6: Login com sucesso para o usuário com erro (error_user)
  test("Cenário 6: Login com sucesso para o usuário com erro (error_user)", async () => {
    await loginPage.login(process.env.ERROR_USER, process.env.PASSWORD);
    await expect(loginPage.page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  // Novo Cenário 7: Login com sucesso para o usuário visual (visual_user)
  test("Cenário 7: Login com sucesso para o usuário visual (visual_user)", async () => {
    await loginPage.login(process.env.VISUAL_USER, process.env.PASSWORD);
    await expect(loginPage.page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  // Novo Cenário 8: Tentativa de login sem preencher o campo de usuário, mas preenchendo o campo de senha
  test("Cenário 8: Tentativa de login sem preencher o campo de usuário, mas preenchendo o campo de senha", async () => {
    await loginPage.login(null, process.env.PASSWORD);
    await loginPage.errorLoginMessage(loginPage.elements.loginError, loginErrorMessages.usernameRequired);
  });

  // Novo Cenário 9: Tentativa de login preenchendo o campo de usuário, mas não preenchendo o campo de senha
  test("Cenário 9: Tentativa de login preenchendo o campo de usuário, mas não preenchendo o campo de senha", async () => {
    await loginPage.login(process.env.STANDARD_USER, '');
    await loginPage.errorLoginMessage(loginPage.elements.loginError, loginErrorMessages.passwordRequired);
  });

  // Novo Cenário 10: Tentativa de login sem preencher nenhum dos campos
  test("Cenário 10: Tentativa de login sem preencher nenhum dos campos", async () => {
    await loginPage.login(null,null);
    await loginPage.errorLoginMessage(loginPage.elements.loginError, loginErrorMessages.usernameRequired);
  });

  // Novo Cenário 11: Tentativa de login com um usuário válido, mas senha incorreta
  test("Cenário 11: Tentativa de login com um usuário válido, mas senha incorreta", async () => {
    await loginPage.login(process.env.STANDARD_USER, 'wrong_password');
    await loginPage.errorLoginMessage(loginPage.elements.loginError, loginErrorMessages.invalidCredentials);
  });

});
