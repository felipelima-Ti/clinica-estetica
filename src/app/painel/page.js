"use client";
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react";

export default function Painel(){
     const [usuario, setUsuario] = useState("");

  useEffect(() => {
    // pega o nome salvo no login
    const nome = localStorage.getItem("usuarioLogado");
    if (nome) {
      setUsuario(nome);
    }
  }, []);

    return(
        <div className="containe">
            <header className="flex items-center justify-between p-3 border-b border-gray-200 bg-black text-white">
  {/* Esquerda */}
  <div className="flex items-center space-x-3">
    <Image src="/fundo.png" width={50} height={50} alt="Logo" />
    <span className="font-bold text-lg">Dona Beleza</span>
  </div>

  {/* Direita */}
  <ul className="flex space-x-10">
    <li>
      <Link href="/agenda" className="hover:text-pink-400 transition-colors">
        Agendar
      </Link>
    </li>
    <li>
      <Link href="/agendamentos" className="hover:text-pink-400 transition-colors">
        Minha agenda
      </Link>
    </li>
    <li>
      <Link href="/suporte" className="hover:text-pink-400 transition-colors">
        Suporte
      </Link>
    </li>
  </ul>
</header>
            <div className="flex flex-col items-center justify-center mt-14 font-bold text-2xl">
              <h2>Clinica de Estetica Dona Beleza</h2>
            <Image className="mt-10 ml-8 border-2 border-gray-100" src="/back.png" alt="A" width={1000} height={300} ></Image>
            </div>
              {usuario && (
          <h1 className=" flex flex-col items-center text-2xl font-bold mb-4 mt-5">
            Olá, {usuario}!, venha renovar sua beleza ainda hoje
          </h1>
        )}
            <h2 className="flex flex-col items-center mt-10 text-lg">Temos tramento especializado para sua estetica sempre inovando e renovando sua beleza</h2>
            <h2 className="text-lg flex flex-col items-center ">conheça nossos serviços</h2>
             <div className="flex justify-center gap-10 mt-10">
          {/* CARD 1 */}
          <div className="flex flex-col items-center">
            <Image
              className=" ml-40 border-2 border-gray-200 rounded-xl"
              src="/estetica.jpg"
              alt="Limpeza de pele"
              width={120}
              height={200}
            />
            <p className=" ml-40 mt-3 text-lg font-medium">
              Limpeza de pele
            </p>
          </div>
           <div className="flex flex-col items-center">
            <Image
              className=" ml-6 border-2 border-gray-200 rounded-xl"
              src="/masagem.jpg"
              alt="Massagem relaxante"
              width={120}
              height={200}
            />
            <p className=" ml-7 mt-3 text-lg font-medium">
              Massagem relaxante
            </p>
          </div>
            <div className="flex flex-col items-center">
            <Image
              className=" border-2 border-gray-200 rounded-xl"
              src="/laser.jpg"
              alt="Massagem relaxante"
              width={120}
              height={200}
            />
            <p className=" ml-8 mt-5 text-lg font-medium">
              Depilaçao a laser
            </p>
          </div>
           <div className="flex flex-col items-center">
            <Image
              className="border-2 border-gray-200 rounded-xl"
              src="/pele.jpg"
              alt="Massagem relaxante"
              width={120}
              height={200}
            />
            <p className="ml-5 mt-3 text-lg font-medium">
              Tratamento facial
            </p>
          </div>
        </div>
        <h1 className=" flex flex-col items-center mt-8 text-2xl">O que voce esta esperando agende agora no botão abaixo </h1>
        <div className="flex flex-col items-center">
         <button
          type="submit"
          className="bg-yellow-600 text-white p-2 rounded hover:bg-yellow-500 mt-5 mb-40 w-45"
        >
          <Link href="/agenda">Agendar atendimento</Link>
        </button>
        <p className="font-bold">Onde nos encontrar</p>
        <p>Rua fulano de tal nao sei oq lah odio veyr</p>
         <p className="mb-10 flex -col items-center mb-20">entre em contato: <b>fulanodetalnaoseioq@gmail.com </b></p>
        </div>
          </div>
    )
}