import { registerUserAuth, registerUserFb } from 'app/functions/register';

// payload {"success":"ok","dni":"123456789","email":"email@gmail.com","name":"name","last_name":"lastname"} http://localhost:3000/api/register/post
export async function POST(request: Request) {
  let response = null;
  try {
    const req = await request.json();
    const dni = req.dni;
    const email = req.email;
    const name = req.name;
    const last_name = req.last_name;
    const plan = req.plan;
    if (email && dni && plan) {
      const result = await registerUserAuth({ user: email, password: dni });
      result.name = `${name} ${last_name}`;
      result.plan = plan;
      result.switch_profile = plan === 'standard' ? false : true;
      console.log('result', result);
      const registerResult = await registerUserFb({ data: result });
      response = {
        payload: { dni, email, name, last_name, plan },
        register: result,
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
