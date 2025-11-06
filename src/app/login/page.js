"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebaseConfig"; 
import Link from "next/link";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensagem("Verificando...");

    try {
      const q = query(
        collection(db, "usuarios"),
        where("usuario", "==", usuario),
        where("senha", "==", senha)
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
  setMensagem("✅ Login realizado com sucesso!");
  
  // pega o nome do usuário logado
  localStorage.setItem("usuarioLogado", usuario);

  
  setTimeout(() => router.push("/painel"), 1000);
}else {
        setMensagem(" Usuário ou senha incorretos.");
      }
    } catch (err) {
      console.error("Erro no login:", err);
      setMensagem(" Erro ao tentar logar. ");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Faça Login</h1>

      <form onSubmit={handleLogin} className="flex flex-col gap-3 w-64">
        <input
          type="text"
          placeholder="Usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Entrar
        </button>
        <Link href="/">não tenho uma conta</Link>
      </form>
       
      {mensagem && <p>{mensagem}</p>}
    </main>
  );
}
