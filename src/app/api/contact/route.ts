import { NextResponse } from "next/server";

// Simple endpoint that validates incoming contact form submissions.
// In production you would forward this to email / CRM / DB. For now we
// validate, log, and respond — Trans Blanco operates primarily via WhatsApp.
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, origin, destination, date, message } = body;

    if (!name || typeof name !== "string" || name.length < 2) {
      return NextResponse.json(
        { ok: false, error: "Nombre inválido" },
        { status: 400 }
      );
    }
    if (!phone && !email) {
      return NextResponse.json(
        { ok: false, error: "Necesitamos un teléfono o correo para responderle" },
        { status: 400 }
      );
    }

    // Build a friendly summary for our team
    const summary = {
      receivedAt: new Date().toISOString(),
      name,
      email: email ?? null,
      phone: phone ?? null,
      origin: origin ?? null,
      destination: destination ?? null,
      date: date ?? null,
      message: message ?? null,
    };

    // In a real deployment we'd push this to a queue / email. For now just log.
    console.log("[Trans Blanco · contact]", summary);

    return NextResponse.json({
      ok: true,
      message: "Recibimos su solicitud. Le contactaremos pronto.",
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Error procesando la solicitud" },
      { status: 500 }
    );
  }
}
