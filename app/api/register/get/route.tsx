import { type NextRequest } from 'next/server';

// dni is "123456", email is "email@gmail.com", name is "name" and last_name is "lastname" for /api/register/get?dni=111023456&email=email2@gmail.com&name=name&last_name=lastname&plan=social
export async function GET(request: NextRequest) {
  let dni,
    email,
    name,
    last_name = null;
  try {
    const searchParams = request.nextUrl.searchParams;
    dni = searchParams.get('dni');
    email = searchParams.get('email');
    name = searchParams.get('name');
    last_name = searchParams.get('last_name');
    // Process the webhook payload
  } catch (error: any) {
    return new Response(`Webhook error: ${error.message}`, {
      status: 400,
    });
  }

  const data = { success: 'ok', dni, email, name, last_name };
  return new Response(JSON.stringify(data), {
    status: 200,
  });
}
