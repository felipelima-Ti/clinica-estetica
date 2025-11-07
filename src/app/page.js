"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const router = useRouter();

  const enviar = async (e) => {
    e.preventDefault();
    setMensagem("Enviando...");

    try {
      const res = await fetch("/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, senha }),
      });

      const data = await res.json();

    if (res.ok) {
  setSucesso(true);
  setMensagem("Usuário cadastrado com sucesso!");
  setTimeout(() => {
    router.push("/login");
  }, 1000);
} else {
  setMensagem(data.error); 
}
    } catch (error) {
      console.error("Erro ao enviar:", error);
      setMensagem(" Erro ao enviar dados.");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4 bg-black ">
            <h2 className="font-bold text-xl">Clinica estetica Dona beleza</h2>
      <Image src="/fundo.png" width={300} height={400} alt=""/>
      <h1 className="text-2xl font-bold">Cadastro de Usuário</h1>

      {!sucesso ? (
        <form onSubmit={enviar} className="flex flex-col gap-3 w-64">
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
          <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Enviar
          </button>
           <Link className="linkk" href="/login">Ja tenho uma conta</Link>
        </form>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <p className="text-green-600 text-lg font-semibold">
            ✅ Usuário cadastrado com sucesso!
          </p>
          <p className="text-gray-600 text-sm">
            Redirecionando para a tela de login...
          </p>
        </div>
      )}

      {mensagem && <p>{mensagem}</p>}
    </main>
  );
}
