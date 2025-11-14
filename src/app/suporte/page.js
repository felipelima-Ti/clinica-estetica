"use client";

import { useEffect, useState } from "react";
import "./suporte.css"
import Image from "next/image";
import { Roboto } from "next/font/google";
import Link from "next/link";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const handleSubmit = async (e) => {
  e.preventDefault();

  const form = new FormData(e.target);
  const data = Object.fromEntries(form.entries());

  const res = await fetch("/api/suporte", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});


  const result = await res.json();
  console.log(result);

  if (res.ok) {
    alert("Mensagem enviada com sucesso!");
    e.target.reset();
  } else {
    alert("Erro ao enviar mensagem.");
  }
};

export default function Suport() {
  const [usuario, setUsuario] = useState("");

  useEffect(() => {
    const nome = localStorage.getItem("usuarioLogado");
    if (nome) setUsuario(nome);
  }, []);

  return (
    <main className="page">
      <section className="card" aria-labelledby="support-title">

        <div className="intro">
          <div className="logo">
            <div className="dot">S</div>
            <div>
              <div className="logo-title">Central de Suporte</div>
              <div className="logo-sub">Estamos aqui para ajudar</div>
            </div>
          </div>

          <h1 id="support-title">
            {usuario && <p>Olá {usuario}</p>}
            Sinta-se à vontade para falar conosco
          </h1>

          <p className="lead">
            Envie-nos uma mensagem pelo formulário ao lado. Respondemos em até 24 horas úteis.
          </p>

          {/* FORMULÁRIO */}
          <form onSubmit={handleSubmit} className="form">
            <label className="lb">Nome</label>
            <input className="inp" name="name" required placeholder="Seu nome" />

            <div className="row">
              <div className="col">
                <label className="lb">E-mail</label>
                <input className="inp"
                  name="email"
                  type="email"
                  required
                  placeholder="seu@exemplo.com"
                />
              </div>

              <div className="col">
                <label className="lb">Assunto</label>
                <select className="slc" name="category">
                  <option className="op" value="duvida">Dúvida</option>
                  <option className="op" value="bug">Relatar bug</option>
                  <option className="op" value="financeiro">Financeiro</option>
                  <option className="op" value="outro">Outro</option>
                </select>
              </div>
            </div>

            <label className="lb">Mensagem</label>
            <textarea className="txt"
              name="message"
              required
              placeholder="Descreva sua mensagem..."
            />

            <button type="submit" className="btn">
              Enviar solicitação
            </button>

            <div className="small">
             ao enviar faremos o retorno pelo o seu email cadastrado.
            </div>
          </form>
        </div>

      </section>
    </main>
  );
}
