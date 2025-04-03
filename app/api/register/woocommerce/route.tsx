import { registerUserAuth, registerUserFb } from "app/functions/register";
import { NextResponse } from "next/server";

// payload {"success":"ok","dni":"123456789","email":"email@gmail.com","name":"name","last_name":"lastname"} http://localhost:3000/api/register/post
export async function POST(request: Request) {
  let response = null;
  try {
    const req = await request.json();
    const dniSearch: { id: number; key: string; value: string } =
      req.meta_data.find(
        (value: { id: number; key: string; value: string }) =>
          value.key === "_billing_dni"
      );

    const status = req.status;
    const dni = dniSearch.value;
    const email = req.billing.email;
    const name = req.billing.first_name;
    const last_name = req.billing.last_name;
    const plan = req?.line_items?.parent_name?.toLowerCase()?.search("premium");
    const date_paid = req?.date_paid;

    // Crear un objeto Date y obtener su timestamp
    const dateCreated = new Date();
    const dateCreatedBd = dateCreated.getTime();

    if (email && dni && status === "processing") {
      const result = await registerUserAuth({ user: email, password: dni });
      result.dni = dni;
      result.name = `${name} ${last_name}`;
      result.email = email;
      result.plan = plan ?? "premium";
      //result.switch_profile = plan === "standard" ? false : true;
      result.switch_profile = false;
      result.created = dateCreatedBd;
      result.isActiveByAdmin = true;
      result.date_paid = date_paid;
      result.templateData =
        plan === "standard"
          ? [
            {
              type: "social",
              id: "XfhZLINMOpRTI7cakd8o",
              background_id: "7ynTMVt3M6VFV3KykOXQ",
              checked: true,
            },
          ]
          : [
            {
              type: "social",
              id: "XfhZLINMOpRTI7cakd8o",
              background_id: "7ynTMVt3M6VFV3KykOXQ",
              checked: true,
            },
            {
              type: "professional",
              id: "ZESiLxKZFwUOUOgLKt6P",
              background_id: "7ynTMVt3M6VFV3KykOXQ",
              checked: true,
            },
          ];

      const registerResult = await registerUserFb({ data: result });
      response = {
        payload: { dni, email, name, last_name, plan: plan ?? "premium" },
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

  const data = { success: "ok", response };
  return new Response(JSON.stringify(data), {
    status: 200,
  });
}
