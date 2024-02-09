import { registerUserAuth, registerUserFb } from 'app/functions/register';
import { type NextRequest } from 'next/server';

// dni is "123456", email is "email@gmail.com", name is "name" and last_name is "lastname" for /api/register/get?dni=111023456&email=email2@gmail.com&name=name&last_name=lastname&plan=social
export async function GET(request: NextRequest) {
  let response = null;
  try {
    const searchParams = request.nextUrl.searchParams;
    const dni = searchParams.get('dni');
    const email = searchParams.get('email');
    const name = searchParams.get('name');
    const last_name = searchParams.get('last_name');
    const plan = searchParams.get('plan');
    if (email && dni && plan) {
      const result = await registerUserAuth({ user: email, password: dni });
      result.name = `${name} ${last_name}`;
      result.plan = plan;
      result.switch_profile = plan === 'standard' ? false : true;
      console.log('result', result);
      const registerResult = await registerUserFb({ data: result });
      response = {
        payload: { dni, email, name, last_name, plan },
        register_auth: result,
        register_firestore: registerResult,
      };
    }

    // Process the webhook payload
  } catch (error: any) {
    return new Response(`Webhook error: ${error.message}`, {
      status: 400,
    });
  }

  const data = { success: 'ok', response };
  return new Response(JSON.stringify(data), {
    status: 200,
  });
}
