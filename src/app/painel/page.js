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
            <header className="flex -col items p-3 border-gray-200 border-1 bg-black">
                <ul className="flex -col item p-2">
                  <div>
                <Image src="/fundo.png" width={50} height={200} alt=""/>
                <li className="font-bold">Dona beleza</li>
                </div>
                <div className="ml-340 mt-10">
                <li className="">
                    <Link href="/agenda">Agendar</Link>
                </li>
                 </div>
                 <li className="mt-10 ml-10">
                    <Link href="/agendamentos">Meus agendamentos</Link>
                </li>
                 <li className="ml-10 mt-10">
                    <Link href="/suporte">Suporte</Link>
                </li>
                </ul>
            </header>
            <div className="flex flex-col items-center justify-center mt-14 font-bold text-2xl">
              <h2>Clinica de Estetica Dona Beleza</h2>
            <Image className="mt-10 ml-8 border-2 border-gray-100" src="/back.png" alt="A" width={1050} height={300} ></Image>
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
              className="border-2 border-gray-200 rounded-xl"
              src="/estetica.jpg"
              alt="Limpeza de pele"
              width={230}
              height={100}
            />
            <p className="mt-3 text-lg font-medium">
              Limpeza de pele
            </p>
          </div>
           <div className="flex flex-col items-center">
            <Image
              className="border-2 border-gray-200 rounded-xl"
              src="/masagem.jpg"
              alt="Massagem relaxante"
              width={230}
              height={200}
            />
            <p className="mt-3 text-lg font-medium">
              Massagem relaxante
            </p>
          </div>
            <div className="flex flex-col items-center">
            <Image
              className="border-2 border-gray-200 rounded-xl"
              src="/laser.jpg"
              alt="Massagem relaxante"
              width={230}
              height={200}
            />
            <p className="mt-3 text-lg font-medium">
              Depilaçao a laser
            </p>
          </div>
           <div className="flex flex-col items-center">
            <Image
              className="border-2 border-gray-200 rounded-xl"
              src="/pele.jpg"
              alt="Massagem relaxante"
              width={230}
              height={250}
            />
            <p className="mt-3 text-lg font-medium">
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
        <p>Rua fulano de tal nao sei oq la 1359</p>
         <p className="mb-10">duvidas entre em contato: <b>fulanodetalnaoseioq@gmail.com </b></p>
        </div>
          </div>
    )
}