"use client";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../lib/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

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
    <div className="agendamentos-container border-b pb-20 mb-20 border-rose-300">
      <h2 className="text-xl mt-5 flex flex-col items-center border-b border-rose-300 pb-20 justify-center">Meus Agendamentos</h2>

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
        className="agendamento-item p-4 border-1 border-rose-300 m-10 p-2 rounded-xl"
      >
        <h3 className="text-lg">Serviço: {agendamento.servico}</h3>
        <p><strong>Data:</strong> {agendamento.data}</p>
        <p><strong>Hora:</strong> {agendamento.hora}</p>
        <p><strong>Observações:</strong> {agendamento.observacoes}</p>

        <button
          onClick={() => excluirAgendamento(agendamento.id)}
          className=" bg-red-300 border-1 border-white-400 p-2 mt-3 rounded-xl w-30"
        >
         Cancelar
        </button>
      </div>
    ))
  ) : (
    <p>Você ainda não tem agendamentos...</p>
  )}
</div>
</div>
  );
}
