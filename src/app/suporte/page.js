"use client";

import "./suporte.css"
import Image from "next/image";
import {Roboto} from 'next/font/google'
import Link from "next/link";
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400','700'], // normal e negrito
})

 
export default function Suport(){
 
   const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    console.log("Suporte enviado:", data);
    alert("Mensagem enviada! Em breve entraremos em contato.");
    e.target.reset();
  };

return(
       <main className="page">
      <section className="card" aria-labelledby="support-title">
        {/* Coluna esquerda */}
        <div className="intro">
          <div className="logo">
            <div className="dot">S</div>
            <div>
              <div className="logo-title">Central de Suporte</div>
              <div className="logo-sub">Estamos aqui para ajudar</div>
            </div>
          </div>

          <h1 id="support-title">Sinta-se avontade para falar conosco</h1>
          <p className="lead">
            Envie-nos uma mensagem pelo formulário ao lado. Respondemos em até 24 horas úteis.
          </p>

          <div className="contact-list">
            <div className="contact-item">
            <Link href="https://mail.google.com/mail/u/0/#inbox?compose=DmwnWslzCnvVSnXPFtQkjljXHmWmdthSJMkCHnMJTGGGwXGHpTgmPWkSbShDKRJnSnlpZpPdNHtb">
              <strong>✉email:</strong><span>DonaBelezaestetica@gmail.com</span>
              
              </Link>
            </div>
            <div className="contact-item">
              <strong>💬 Chat</strong>
              <span>Iniciar chat de app</span>
            </div>
            <div className="contact-item">
              <strong>📞 Telefone</strong>
              <span>+55 (32) 98893-4044</span>
            </div>
          </div>
        </div>

        {/* Coluna direita - formulário */}
        <form onSubmit={handleSubmit} className="form">
          <label>Nome</label>
          <input name="name" required placeholder="Seu nome" />

          <div className="row">
            <div className="col">
              <label>E-mail</label>
              <input
                name="email"
                type="email"
                required
                placeholder="seu@exemplo.com"
              />
            </div>
            <br></br>
            <div className="col">
              <label>Assunto</label>
              <select name="category">
                <option value="duvida">Dúvida</option>
                <option value="bug">Relatar bug</option>
                <option value="financeiro">Financeiro</option>
                <option value="outro">Outro</option>
              </select>
            </div>
          </div>

          <label>Mensagem</label>
          <textarea
            name="message"
            required
            placeholder="Descreva sua mensagem..."
          />

          <button type="submit" className="btn">
            Enviar solicitação
          </button>
          <div className="small">
            Ao enviar, você receberá um número de protocolo por e-mail.
          </div>
        </form>
      </section>
    </main>
)
}