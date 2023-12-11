import { Dictionary } from './dictionary';

export type LoginProps = { dictionary: Dictionary };
export type LoginHookProps = { user: string; password: string };
export type LoginFirebaseProps = LoginHookProps;
export type LoginError = { errorType: number; errorMessage: string };
