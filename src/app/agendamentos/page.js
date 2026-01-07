"use client";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../lib/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";

export default function Agendamentos() {
  const [usuario, setUsuario] = useState("");
  const [agendamentos, setAgendamentos] = useState([]);
  const [ordem, setOrdem] = useState("proximo");
  const excluirAgendamento = async (id) => {
  const confirmar = confirm("Tem certeza que deseja Cancelar este agendamento?");
  if (!confirmar) return;

  try {
    await deleteDoc(doc(db, "agendamentos", id));
    alert("Agendamento Cancelado com sucesso!");
    fetchAgendamentos(usuario); 
  } catch (error) {
    console.error("Erro ao Cancelar agendamento ): ", error);
    alert("Erro ao cancelar D: ");
  }
};

  useEffect(() => {
    const nome = localStorage.getItem("usuarioLogado");
    if (nome) {
      setUsuario(nome);
      fetchAgendamentos(nome);
    }
  }, []);

  const fetchAgendamentos = async (usuario) => {
    try {

      const q = query(
        collection(db, "agendamentos"),
        where("usuario", "==", usuario)
      );
      const querySnapshot = await getDocs(q);
      const agendamentosList = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      
      const agendamentosOrdenados = agendamentosList.sort((a, b) => {
        const dataA = new Date(a.data);
        const dataB = new Date(b.data);

       
        if (ordem === "proximo") {
          return dataA - dataB;
        }

        
        if (ordem === "recente") {
          return dataB - dataA;
        }

        return 0;
      });

      setAgendamentos(agendamentosOrdenados);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
    }
  };

  const handleOrdenacao = (e) => {
    setOrdem(e.target.value);
    fetchAgendamentos(usuario); 
  };

  return (
    <div>
       <header className="flex items-center justify-between p-3 border-b border-gray-200 bg-black text-white w-full h-20 mb-20"
        >
          <div className="flex items-center justify-center space-x-3">
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
               <Link href="/painel" className="hover:text-gray-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
            <Link href="/suporte" className="hover:text-gray-400 transition-colors">
                Suporte
              </Link>
            </li>
          </ul>
        </header>
        <h2 className="text-xl mt-5 flex flex-col items-center pb-20 justify-center">Meus Agendamentos<br></br></h2>
    <div className="agendamentos-container border pb-20 mb-20 border-rose-300 m-2 rounded-xl">
      
     

      {usuario && (
        <p className="m-5 text-lg ml-10 mt-10">
          Agendamentos de: <strong>{usuario}</strong>
        </p>
      )}

    
      <div className="ordenacao-container m-5">
        <label className="" htmlFor="ordenacao">Ordenar por:</label>
        <select
          id="ordenacao"
          value={ordem}
          onChange={handleOrdenacao}
          className="border-1 border-rose-300 p-2 rounded-xl text-white ml-1"
        >
          <option className="text-black border-rose-300" value="proximo">Mais recentes</option>
          <option className="text-black border-rose-300" value="recente">Mais proximos</option>
        </select>
      </div>

    <div className="agendamentos-list">
      {agendamentos.length > 0 ? (
      agendamentos.map((agendamento) => (
      <div
        key={agendamento.id}
        className="agendamento-item p-4 border-1 border-rose-300 m-10 p-2 rounded-xl bg-rose-200 text-black"
      >
        <h3 className="text-lg">Serviço: {agendamento.servico}</h3>
        <p><strong>Data:</strong> {agendamento.data}</p>
        <p><strong>Hora:</strong> {agendamento.hora}</p>
        <p><strong>Observações:</strong> {agendamento.observacoes}</p>

        <button
          onClick={() => excluirAgendamento(agendamento.id)}
          className=" bg-red-300 border-1 border-white-400 p-2 mt-3 rounded-xl w-30 font-bold"
        >
         Cancelar
        </button>
      </div>
    ))
  ) : (
    <p>Você ainda não tem agendamentos...</p>
  )}
  <p className=" ml-10 mt-10 text-lg mr-10 text-center"><b className="text-rose-300"></b>Em caso de Cancelamento voce deve informar por favor em 5 horas antes</p>
</div>
</div>
</div>
  );
}
