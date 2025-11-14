"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Painel() {
  const [usuario, setUsuario] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = [
    { src: "/estetica.jpg", label: "Limpeza de pele" },
    { src: "/masagem.jpg", label: "Massagem relaxante" },
    { src: "/laser.jpg", label: "Depilação a laser" },
    { src: "/pele.jpg", label: "Tratamento facial" },
    { src: "/cabelo.jpg", label: "Tratamento de cabelo" },
  ];

  useEffect(() => {
    
    const nome = localStorage.getItem("usuarioLogado");
    if (nome) {
      setUsuario(nome);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev < cards.length - 3 ? prev + 1 : 0
      );
    }, 2000); 
    return () => clearInterval(interval);
  }, [cards.length]);

  return (
    <main>
    <div className="">
      <header className="flex items-center justify-between p-3 border-b border-gray-200 bg-black text-white w-full h-40"
        >
        <div className="flex items-center justify-center space-x-3">
          <Image className="" src="/fundo.png" width={50} height={50} alt="Logo" />
          
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
      <div
  className="items-center justify-center w-full h-[750px] bg-cover bg-center"
  style={{
    backgroundImage: "url('/clinicaa.jpg')",
    backgroundRepeat: "no-repeat"
  }}
>
  <p className=" pt-80 text-white text-4xl font-bold text-center">
    Nós Cuidamos Da Sua <b className="text-rose-300">Beleza!</b>
  </p>
  <div className="flex items-center justify-center ">
    <button
  onClick={() => {
    const section = document.getElementById("servicos");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }}
  className="border border-rose-300 w-50 h-10 bg-rose-100 mt-20 text-rose-300"
>
  Conheça nossos serviços
</button>
  </div>
</div>

      <div className="ml-10">
        <div className="flex flex-col items-center justify-center mt-14 font-bold text-4xl">
           {usuario && (
          <h1 className="flex flex-col items-center text-2xl font-bold mb-4 mt-5">
            Olá {usuario}!, venha renovar sua beleza ainda hoje
          </h1>
        )}
          
          <Image
            className="mt-10  border-2 border-gray-100"
            src="/back.png"
            alt="A"
            width={1200}
            height={300}
          />
        </div>
        <div className="container mx-auto flex flex-col md:flex-row justify-between gap-10 px-6">
           <div className="md:w-1/2">
            <h3 className="font-semibold mb-3 mt-20 ml text-rose-200 ml">A CLÍNICA</h3>
            <h3 className="text-xl font-semibold mb-3 ml">Um espaço moderno para melhor te atender!</h3>
            <p className="ml ml-15">
             Experiência única e humana, baseada na verdade e na<br></br> transparência para seu completo bem-estar e beleza. Atuando<br></br> sempre de forma segura e profissional, aliando conhecimento<br></br> médico, experiência e principalmente, a conexão entre pessoas<br></br> para melhor entender e proporcionar um resultado<br></br> surpreendente.

A Dona Beleza traz o mais novo conceito em<br></br> Dermatologia, aliando o profissionalismo e a seriedade com o <br></br>conforto e bem-estar de seus pacientes.<br></br>

Modernidade e elegância compõem nossas instalações que<br></br> foram planejadas para receber e tratar cada paciente de forma<br></br> individualizada, personalizada e com toda a atenção<br></br> necessária.

Para isso dispomos de lasers e equipamentos<br></br> modernos, além de atualizações constantes em relação a novos<br></br> tratamentos e procedimentos com o objetivo de oferecer qualidade,<br></br> segurança e o melhor possível a todos que nos procuram.
            </p>
          </div>
          <div className="md:w-1/2 mt-10">
             <Image src="/clinicaa.jpg" width={900} height={200} alt=""/>
          </div>
        </div>
        <div className=" text-xl mt-10 flex flex-col items-center m-2"><p><b>Temos os melhores profissionais na area junto com um ambiente agradavel e relaxante</b></p>
        
        </div>
       <div className="container mx-auto flex flex-col items-center md:flex-row justify-start mt-10">
  <div className="md:w-16/4 m-3">
    <Image src="/clinica1.jpg" width={400} height={200} alt="" className="" />
  </div>
   <div className="md:w-18/4 m-3">
    <Image src="/UI.jpg" width={400} height={200} alt="" className="" />
  </div>
  
  <div className="md:w-33/4 m-3">
    <Image src="/clinica4.jpeg" width={685} height={200} alt="" className="" />
  </div> 
  <div className="md:w-13/4 m-3">
    <Image src="/AS.jpg" width={295} height={200} alt="" className="" />
  </div> 
</div>
<div className="text-xl mt-10 flex flex-col ml-15 mr-20">
<p>O melhor atendimento com os melhores serviços 👉 <br></br></p>
</div>
        <section id="servicos">
        <br></br>
        <h2 className="text-xl flex flex-col items-center mr-14">Conheça todos os nossos serviços</h2>

        {/* CARROSSEL DE IMAGENS*/}
        <div className="relative w-full max-w-2xl mx-auto mt-10">
         
          <div className="overflow-hidden ">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
            >
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-1/3 p-1"
                >
                  <Image
                    className="border-2 border-gray-200 rounded-xl"
                    src={card.src}
                    alt={card.label}
                    width={130}
                    height={200}
                  />
                  <p className="mt-3 text-lg font-medium">{card.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
            </section>
            <h1 className="flex flex-col items-center mt-8 text-2xl text-rose-200">
          Nós valorizamos sua Beleza!
        </h1>
        <h1 className="flex flex-col items-center mt-8 text-2xl">
          O que você está esperando? Agende agora no botão abaixo
        </h1>
        <div className="flex flex-col items-center">
          <button
            type="submit"
            className="bg-yellow-600 text-white p-2 rounded hover:bg-yellow-500 mt-5 mb-40 w-45"
          >
            <Link href="/agenda">Agendar atendimento</Link>
          </button>
        </div>
        
      </div>

      {/*RODAPE*/}
      <footer className="bg-red-200 text-black py-10">
        <div className="container mx-auto flex flex-col md:flex-row justify-between gap-10 px-6">
          <div className="md:w-1/4">
            <h3 className="text-lg font-semibold mb-3">Sobre</h3>
            <p className="text-sm">
              A Dona Beleza, empresa consolidada desde 2003, traz um conceito diferenciado que une
              os melhores tratamentos estéticos com tecnologia avançada, aliado a uma experiência
              sensorial que traz o relaxamento necessário para o seu dia a dia.
            </p>
          </div>

          <div className="md:w-1/4">
            <h3 className="text-lg font-semibold mb-3">Informações de Contato</h3>
            <p>
              <strong>Endereço:</strong>
              <br /> Av. Bias Fortes, 970...
            </p>
            <p>
              <strong>Contato:</strong>
              <br /> (32) 3331-6818
            </p>
            <p>
              <strong>Email:</strong>
              <br /> DonaBelezaestetica@gmail.com
            </p>
          </div>

          <div className="md:w-1/4">
            <h3 className="text-lg font-semibold mb-3">Links Úteis</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Estética Corporal
                </a>
              </li>
            </ul>
          </div>

          <div className="md:w-1/4">
            <h3 className="text-lg font-semibold mb-3">Inscreva-se</h3>
            <p className="text-sm mb-3">
              Ao se inscrever na nossa lista, você sempre receberá nossas últimas notícias e
              atualizações sobre nossa empresa.
            </p>
            <input
              type="email"
              placeholder="Entre com seu email..."
              className="border border-black p-2 w-full"
            />
          </div>
        </div>

        <div className="text-center mt-10 border-t border-black pt-4 text-sm">
          © 2018 | Dona Beleza. Todos os Direitos Reservados | Design por{" "}
          <a href="https://www.instagram.com/felipelimahbl/" className="underline">
            Felipe
          </a>
        </div>
      </footer>
    </div>
    </main>
  );
}
