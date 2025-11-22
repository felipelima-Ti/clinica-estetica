"use client";
import { useState, useEffect } from "react";
import {addDoc,collection,Timestamp,query,where,getDocs,} from "firebase/firestore";
import { db } from "../lib/firebaseConfig";
import { useRouter } from "next/navigation";
import Image from "next/image";
export default function Agenda() {
  const [usuario, setUsuario] = useState("");
  const [form, setForm] = useState({
    servico: "",
    data: "",
    hora: "",
    observacoes: "",
  });
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const router = useRouter();

  const horariosBase = [
    "08:00", "09:00", "10:00", "11:00",
    "12:00", "13:00", "14:00", "15:00",
    "16:00", "17:00", "18:00"
  ];

  useEffect(() => {
    const nome = localStorage.getItem("usuarioLogado");
    if (nome) setUsuario(nome);
  }, []);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // quando o usuário escolher uma data, buscar horários ocupados
    if (name === "data") {
      await verificarHorarios(value);
    }
  };

  const verificarHorarios = async (dataSelecionada) => {
    try {
      // busca todos os agendamentos dessa data
      const q = query(
        collection(db, "agendamentos"),
        where("data", "==", dataSelecionada)
      );
      const querySnapshot = await getDocs(q);

      // cria uma lista com as horas já ocupadas
      const ocupados = querySnapshot.docs.map((doc) => doc.data().hora);

      // filtra os horários livres
      const livres = horariosBase.filter((hora) => !ocupados.includes(hora));

      setHorariosDisponiveis(livres);
    } catch (error) {
      console.error("Erro ao verificar horários:", error);
      setHorariosDisponiveis([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usuario) {
      alert("Erro: usuário não encontrado. Faça login novamente.");
      return;
    }

    try {

      const q = query(
        collection(db, "agendamentos"),
        where("data", "==", form.data),
        where("hora", "==", form.hora)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        alert("Este horário acabou de ser ocupado. Escolha outro.");
        await verificarHorarios(form.data);
        return;
      }

      await addDoc(collection(db, "agendamentos"), {
        usuario,
        servico: form.servico,
        data: form.data,
        hora: form.hora,
        observacoes: form.observacoes,
        criadoEm: Timestamp.now(),
      });
      const numeroWhatsApp = "5532988934044"; // substitua pelo seu número!

const mensagem = `
Novo agendamento recebido ✔

👤 Nome: ${usuario}
💆 Serviço: ${form.servico}
📅 Data: ${form.data}
⏰ Hora: ${form.hora}

Obs: ${form.observacoes || "Nenhuma"}
`;

const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
alert("Agendamento feito com sucesso! enviaremos o WhatsApp de confirmação.");
window.open(url, "_blank");

router.push("/painel");

  } catch (error) {
    console.error("Erro ao salvar agendamento:", error);
    alert("Erro ao agendar. Tente novamente.");
    }
  };
  

  return (
    <div className="agenda-container">
      <h2 className="flex flex-col items-center mt-5 text-xl text-rose-300">
        Agendar atendimento
      </h2>

      {usuario && (
        <p className="m-5 text-lg">
          Nome do Cliente: <strong>{usuario}</strong>
        </p>
      )}
        <div className="ml-10">
  <p className="font-bold mb-5">Tabela de preços de nossos serviços</p>
</div>
  <div className="flex items-center">
    <Image src="/pele.jpg" width={70} height={100} alt="" className="border border-white ml-10" />
    <p className="ml-5">Limpeza de pele: <b className="text-rose-300">90R$</b></p>
  </div>

  <div className="flex items-center mt-5 ml-10">
    <Image src="/masagem.jpg" width={70} height={100} alt="" className="border border-white" />
    <p className="ml-5">Massagem Relaxante: <b className="text-rose-300">70R$</b></p>
  </div>

  <div className="flex items-center mt-5 ml-10">
    <Image src="/laser.jpg" width={70} height={100} alt="" className="border border-white" />
    <p className="ml-5">Depilação a laser: <b className="text-rose-300">100R$</b></p>
  </div>

  <div className="flex items-center mt-5 ml-10">
    <Image src="/cabelo.jpg" width={70} height={100} alt="" className="border border-white" />
    <p className="ml-5">Tratamento de Cabelo: <b className="text-rose-300">150R$</b></p>
  </div>
   <div className="flex items-center mt-5 ml-10">
    <Image src="/facial.jpeg" width={75} height={100} alt="" className="border border-white" />
    <p className="ml-5">Tratamento facial: <b className="text-rose-300">120R$</b></p>
  </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 border-2 border-gray-200 p-6 rounded-2xl shadow-lg text-white m-5"
      >
        <label>Serviço desejado:</label>
        <select
          name="servico"
          value={form.servico}
          className="border-1 border-gray-200 p-6 rounded-2xl shadow-lg text-white"
          onChange={handleChange}
          required
        >
          <option value="" className="text-black">
            Selecione...
          </option>
          <option value="Limpeza de pele" className="text-black">
            Limpeza de pele
          </option>
          <option value="Massagem relaxante" className="text-black">
            Massagem relaxante
          </option>
          <option value="Depilação a laser" className="text-black">
            Depilação a laser
          </option>
          <option value="Tratamento facial" className="text-black">
            Tratamento facial
          </option>
           <option value="Tratamento facial" className="text-black">
            Tratamento de Cabelo
          </option>
        </select>

        <label>Data:</label>
        <input
          type="date"
          name="data"
          value={form.data}
          onChange={handleChange}
          required
          className="border-1 border-gray-200 rounded-2xl text-white h-14 p-5"
        />

        {form.data && (
          <>
            <label>Horário disponível:</label>
            {horariosDisponiveis.length > 0 ? (
              <select
                name="hora"
                value={form.hora}
                onChange={handleChange}
                required
                className="border-1 border-gray-200 rounded-2xl text-white h-14 p-2"
              >
                <option className="text-black" value="">Selecione um horário</option>
                {horariosDisponiveis.map((hora) => (
                  <option className="text-black" key={hora} value={hora}>
                    {hora}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-red-400">
                Nenhum horário disponível neste dia 😢
              </p>
            )}
          </>
        )}

        <label>Observações:</label>
        <textarea
          name="observacoes"
          value={form.observacoes}
          onChange={handleChange}
          placeholder="Ex: alergias, preferências..."
          className="rounded-2xl border-1 border-gray-200 h-40 p-2"
        />

        <div className="flex flex-col items-center">
          <button
            type="submit"
            className="bg-blue-600 w-60 rounded-xl h-10 items-center"
            disabled={!form.hora || horariosDisponiveis.length === 0}
          >
            Agendar
          </button>
        </div>
      </form>
    </div>
  );
}

