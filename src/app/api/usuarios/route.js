import { db } from "../../lib/firebaseConfig";
import { collection, addDoc, getDocs, query, where, Timestamp } from "firebase/firestore";

export async function POST(req) {
  try {
    const { usuario, senha } = await req.json();
    console.log("Dados recebidos:", { usuario, senha });

    if (!usuario || !senha) {
      return new Response(
        JSON.stringify({ error: "Usuário e senha são obrigatórios" }),
        { status: 400 }
      );
    }

    // 🔍 Verifica se já existe um usuário com o mesmo nome
    const q = query(collection(db, "usuarios"), where("usuario", "==", usuario));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      // ⚠️ Já existe um usuário com esse nome
      return new Response(
        JSON.stringify({ error: "Nome de usuário já cadastrado. Escolha outro." }),
        { status: 409 } // código HTTP 409 = conflito
      );
    }

    // ✅ Se não existe, cadastra normalmente
    const docRef = await addDoc(collection(db, "usuarios"), {
      usuario: String(usuario),
      senha: String(senha),
      criadoEm: Timestamp.now(),
    });

    return new Response(
      JSON.stringify({ message: "Usuário adicionado!", id: docRef.id }),
      { status: 200 }
    );

  } catch (error) {
    console.error("🔥 Erro ao adicionar usuário:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao adicionar usuário" }),
      { status: 500 }
    );
  }
}

