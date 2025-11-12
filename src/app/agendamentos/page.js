"use client";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../lib/firebaseConfig";

export default function Agendamentos() {
  const [usuario, setUsuario] = useState("");
  const [agendamentos, setAgendamentos] = useState([]);
  const [ordem, setOrdem] = useState("proximo");

  useEffect(() => {
    const nome = localStorage.getItem("usuarioLogado");
    if (nome) {
      setUsuario(nome);
      fetchAgendamentos(nome);
    }
  }, []);

  const fetchAgendamentos = async (usuario) => {
    try {
      // Consulta os agendamentos do usuário logado
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
    fetchAgendamentos(usuario); // Recarregar agendamentos com a nova ordenação
  };

  return (
    <div className="agendamentos-container">
      <h2 className="text-xl mt-5 flex flex-col items-center justify-center">Meus Agendamentos</h2>

      {usuario && (
        <p className="m-5 text-lg ml-10">
          Agendamentos de: <strong>{usuario}</strong>
        </p>
      )}

    
      <div className="ordenacao-container m-5">
        <label className="" htmlFor="ordenacao">Ordenar por:</label>
        <select
          id="ordenacao"
          value={ordem}
          onChange={handleOrdenacao}
          className="border-1 border-gray-200 p-2 rounded-xl text-white ml-1"
        >
          <option className="text-black" value="proximo">Mais recentes</option>
          <option className="text-black" value="recente">Mais proximos</option>
        </select>
      </div>

      <div className="agendamentos-list">
        {agendamentos.length > 0 ? (
          agendamentos.map((agendamento) => (
            <div key={agendamento.id} className="agendamento-item p-4 border-1 m-10 p-2">
              <h3 className="text-lg">Serviço: {agendamento.servico}</h3>
              <p><strong>Data:</strong> {agendamento.data}</p>
              <p><strong>Hora:</strong> {agendamento.hora}</p>
              <p><strong>Observações:</strong> {agendamento.observacoes}</p>
            </div>
          ))
        ) : (
          <p>Você ainda não tem agendamentos...</p>
        )}
      </div>
    </div>
  );
}
