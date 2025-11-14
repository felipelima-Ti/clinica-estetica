export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { db } from "../../lib/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export async function POST(req) {
  try {
    const { name, email, category, message } = await req.json();

    const docRef = await addDoc(collection(db, "suporte"), {
      nome: name,
      email: email,
      tipo: category,
      mensagem: message,
      criadoEm: Timestamp.now(),
    });

    return NextResponse.json(
      { message: "Mensagem enviada com sucesso!", id: docRef.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao enviar suporte:", error);
    return NextResponse.json(
      { error: "Erro ao enviar mensagem" },
      { status: 500 }
    );
  }
}
