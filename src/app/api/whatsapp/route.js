import { NextResponse } from "next/server";

export async function POST(req) {
  const { nome, servico, data, hora } = await req.json();

  //dados do meta
  const phoneNumberId = "860041123864196";
  const accessToken = "EAAQea2tuxMYBPZBpk2LEOlgZC8CpDroW1Y8WRfzZAzOAaAP586Tt5cY5LMyOt9PtJoa88ZC3ZC2p5jU5FNSbBNUzHpNjrAgDSBjHoHL1zHr0lSBYFcJ6UtZCWx8YWNAzExhiOVDxBPAvEV1p9Rg7qv2mEN2QZCSgUbXNxoZCB6oG2B9MH2NTahxyHUtJDzR0RQP0ilIY7Rx95w19JT4gYkI4z7IHWV2Go2fH7IdvYgZCxgU9Ed4LAt7X7ZAScZAhZBzD7CR36bf6NNNcTyMZBKBWoiZClSJQlL";

  const msg = `📅 *Novo agendamento!*
👤 Cliente: ${nome}
💆 Serviço: ${servico}
📆 Data: ${data}
⏰ Hora: ${hora}`;

  try {
    const res = await fetch(`https://graph.facebook.com/v22.0/${phoneNumberId}/messages`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: "5532988934044", // Ex: 55XXXXXXXXXXX
        type: "text",
        text: { body: msg },
      }),
    });

    const data = await res.json();
    console.log("Resposta da API:", data);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
    return NextResponse.json({ success: false, error });
  }
}
