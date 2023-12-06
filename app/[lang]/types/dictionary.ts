export interface Dictionary {
  homeTitle: string;
  rememberPasswordTitle: string;
  rememberPasswordDescription: string;
  mainMenu: string;
  mainTab: { tab1: string; tab2: string; tab3: string; tab4: string };
  loginView: { username: string; password: string; login: string };
  homeView: { views: string; title: string; };
  recoverPassword: {recoverpassword:string; mail:string; next:string; back:string;};
  recoveryCode:{nextCode:string; backCode:string; resendcode:string; code:string; enter_the_recovery_code_that_we_have_sent_to_your_email:string; recoverycode:string; }
  newPassword:{createnewpassword:string; newpassword:string; repeatpassword:string; nextnewpassword:string}
  passwordChangedSuccessfully:string;
}
