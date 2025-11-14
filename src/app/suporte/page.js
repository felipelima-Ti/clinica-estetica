"use client";

import { useEffect, useState } from "react";
import styles from "./suporte.module.css";
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
     <div className={styles.page}>
      <section className={styles.card} aria-labelledby="support-title">

        <div className={styles.intro}>
          <div className={styles.logo}>
            <div className={styles.dot}>S</div>
            <div>
              <div className={styles["logo-title"]}>Central de Suporte</div>
              <div className={styles["logo-sub"]}>Estamos aqui para ajudar</div>
            </div>
          </div>

          <h1 id="support-title">
            {usuario && <p>Olá {usuario}</p>}
            Sinta-se à vontade para falar conosco
          </h1>

          <p className={styles.lead}>
            Envie-nos uma mensagem pelo formulário ao lado. Respondemos em até 24 horas úteis.
          </p>

          <form className={styles.form}>
            <label className={styles.lb}>Nome</label>
            <input className={styles.inp} name="name" required placeholder="Seu nome" />

            <div className={styles.row}>
              <div className={styles.col}>
                <label className={styles.lb}>E-mail</label>
                <input className={styles.inp} name="email" type="email" required placeholder="seu@exemplo.com" />
              </div>

              <div className={styles.col}>
                <label className={styles.lb}>Assunto</label>
                <select className={`${styles.slc} op`} name="category">
                  <option value="duvida">Dúvida</option>
                  <option value="bug">Relatar bug</option>
                  <option value="financeiro">Financeiro</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
            </div>

            <label className={styles.lb}>Mensagem</label>
            <textarea className={styles.txt} name="message" required placeholder="Descreva sua mensagem..." />

            <button type="submit" className={styles.btn}>
              Enviar solicitação
            </button>

            <div className={styles.small}>
              Ao enviar faremos o retorno pelo seu e-mail cadastrado.
            </div>
          </form>
        </div>

      </section>
    </div>
  );
}
