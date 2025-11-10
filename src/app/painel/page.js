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
        <div className="">
            <header className="flex items-center justify-between p-3 border-b border-gray-200 bg-black text-white w-full">

  <div className="flex items-center space-x-3">
    <Image src="/fundo.png" width={50} height={50} alt="Logo" />
    <span className="font-bold text-lg">Dona Beleza</span>
  </div>

  <ul className="flex space-x-10">
    <li>
      <Link href="/agenda" className="hover:text-gray-400 transition-colors">
        Agendar
      </Link>
    </li>
    <li>
      <Link href="/agendamentos" className="hover:text-gray-400 transition-colors">
        Minha agenda
      </Link>
    </li>
    <li>
      <Link href="/suporte" className="hover:text-gray-400 transition-colors">
        Contato
      </Link>
    </li>
  </ul>
</header>
      <div className="ml-10">
            <div className="flex flex-col items-center justify-center mt-14 font-bold text-4xl">
              <h2><b>BEM VINDO a </b> Clinica de Estetica Dona Beleza</h2>
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
              className="  border-2 border-gray-200 rounded-xl"
              src="/estetica.jpg"
              alt="Limpeza de pele"
              width={150}
              height={200}
            />
            <p className=" ml-5 mt-3 text-lg font-medium">
              Limpeza de pele
            </p>
          </div>
           <div className="flex flex-col items-center">
            <Image
              className="  border-2 border-gray-200 rounded-xl"
              src="/masagem.jpg"
              alt="Massagem relaxante"
              width={150}
              height={200}
            />
            <p className="mt-3 text-lg font-medium">
              Massagem relaxante
            </p>
          </div>
            <div className="flex flex-col items-center">
            <Image
              className=" border-2 border-gray-200 rounded-xl"
              src="/laser.jpg"
              alt="Massagem relaxante"
              width={150}
              height={200}
            />
            <p className=" ml-2 mt-3 text-lg font-medium">
              Depilaçao a laser
            </p>
          </div>
           <div className="flex flex-col items-center">
            <Image
              className="border-2 border-gray-200 rounded-xl"
              src="/pele.jpg"
              alt="Massagem relaxante"
              width={150}
              height={200}
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
         </div>
        </div>
        <footer className="bg-red-200 text-black py-10">
  <div className="container mx-auto flex flex-col md:flex-row justify-between gap-10 px-6">
    
   
    <div className="md:w-1/4">
      <h3 className="text-lg font-semibold mb-3">Sobre</h3>
      <p className="text-sm">
        A Dona Beleza empresa consolidada<br></br> deste 2003, traz um conceito<br></br> diferenciado que une os melhores<br></br> tratamentos estéticos com<br></br> a tecnologia avançada, aliado com<br></br> uma experiência sensorial que traz<br></br> o relaxamento necessário para<br></br> o seu dia a dia.
      </p>
    </div>

  
    <div className="md:w-1/4">
      <h3 className="text-lg font-semibold mb-3">Informações de Contato</h3>
      <p><strong>Endereço:</strong><br></br> Av. Bias Fortes, 970...</p>
      <p><strong>Contato:</strong><br></br> (32) 3331-6818</p>
      <p><strong>Email:</strong><br></br> DonaBelezaestetica@gmail.com</p>
    </div>

    
    <div className="md:w-1/4">
      <h3 className="text-lg font-semibold mb-3">Links Úteis</h3>
      <ul className="space-y-1">
        <li><a href="#" className="hover:underline">Home</a></li>
        <li><a href="#" className="hover:underline">Sobre</a></li>
        <li><a href="#" className="hover:underline">Estética Corporal</a></li>
      </ul>
    </div>

    <div className="md:w-1/4">
      <h3 className="text-lg font-semibold mb-3">Inscreva-se</h3>
      <p className="text-sm mb-3">
        Ao se inscrever na nossa lista, você sempre receberá nossas últimas notícias e atualizações.
      </p>
      <input
        type="email"
        placeholder="Entre com seu email..."
        className="border border-black p-2 w-full"
      />
    </div>
  </div>

  <div className="text-center mt-10 border-t border-black pt-4 text-sm">
    © 2018 | Dona Beleza. Todos os Direitos Reservados | Design por <a href="https://www.instagram.com/felipelimahbl/" className="underline">Felipe</a>
  </div>
</footer>
          </div>
    )
}