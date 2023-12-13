export interface Dictionary {
  homeTitle: string;
  rememberPasswordTitle: string;
  rememberPasswordDescription: string;
  mainMenu: string;
  mainTab: { tab1: string; tab2: string; tab3: string; tab4: string };
  loginView: { username: string; password: string; login: string; recoverPass: string; };
  homeView: { views: string; title: string; };
  recoverPassword: {recoverpassword:string; mail:string; next:string; back:string;};
  recoveryCode:{nextCode:string; backCode:string; resendCode:string; code:string; descriptionCode:string; titleCode:string; }
  newPassword:{createNewPass:string; nPassword:string; repeatPassword:string; nextNewPassword:string}
  passwordChangedSuccessfully:string;
}
