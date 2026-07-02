import ScrollCanvas from "../components/ScrollCanvas";
import { content, CANONICAL_BRAND_NAME, CANONICAL_THERAPIST_NAME } from "../data/content";

export default function Home() {
  return (
    <main id="scroll-wrapper" className="relative w-full h-[650vh]">
      {/* Client Scroll Canvas Controller */}
      <ScrollCanvas />

      {/* ========================================================================= */}
      {/* FASE 1: Hero Layer (Frames 0-75) */}
      {/* ========================================================================= */}
      <section
        id="hero-layer"
        className="fixed left-6 md:left-24 top-1/2 -translate-y-1/2 w-full max-w-[90vw] md:max-w-3xl z-10 transition-transform duration-100 ease-out select-none"
        data-intent="informational"
      >
        <div className="space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider text-brand-green bg-brand-green/10 border border-brand-green/20 uppercase">
            Síntese do Método
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] text-white">
            {content.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-medium max-w-xl">
            {content.hero.subtitle}
          </p>
          <div className="p-6 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm max-w-2xl">
            <h3 className="text-xs font-bold text-brand-purple tracking-widest uppercase mb-2">Definição Factual</h3>
            <p className="text-sm md:text-base text-gray-300 leading-relaxed font-light">
              {content.hero.directAnswer}
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FASE 2: Micro-Cards Layer (Frames 76-165) */}
      {/* ========================================================================= */}
      <section
        id="cards-layer"
        className="fixed inset-0 w-full h-full z-10 pointer-events-none flex items-center justify-center"
        data-intent="comparative"
      >
        <div className="relative w-full max-w-xl px-6 flex items-center justify-center h-full">
          
          {/* Card 1: Nível Psicológico */}
          <div className="fase-2-card opacity-0 absolute glass-card rounded-2xl p-8 space-y-4 max-w-lg transition-all duration-100 ease-out">
            <span className="text-xs font-bold tracking-widest text-brand-purple uppercase">Nível de Integração</span>
            <h3 className="text-2xl font-bold text-white">
              {content.integrationLevels[0].level}
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              <strong>Foco:</strong> {content.integrationLevels[0].focus}
            </p>
            <p className="text-sm text-gray-400 italic">
              <strong>Resultado:</strong> {content.integrationLevels[0].result}
            </p>
            <div className="flex gap-2 pt-2 border-t border-white/5">
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400 uppercase font-semibold">Pw 193</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400 uppercase font-semibold">Pw 246</span>
            </div>
          </div>

          {/* Card 2: Nível Mental */}
          <div className="fase-2-card opacity-0 absolute glass-card rounded-2xl p-8 space-y-4 max-w-lg transition-all duration-100 ease-out">
            <span className="text-xs font-bold tracking-widest text-brand-purple uppercase">Nível de Integração</span>
            <h3 className="text-2xl font-bold text-white">
              {content.integrationLevels[1].level}
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              <strong>Foco:</strong> {content.integrationLevels[1].focus}
            </p>
            <p className="text-sm text-gray-400 italic">
              <strong>Resultado:</strong> {content.integrationLevels[1].result}
            </p>
            <div className="flex gap-2 pt-2 border-t border-white/5">
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400 uppercase font-semibold">Pw 258</span>
            </div>
          </div>

          {/* Card 3: Nível Espiritual */}
          <div className="fase-2-card opacity-0 absolute glass-card rounded-2xl p-8 space-y-4 max-w-lg transition-all duration-100 ease-out">
            <span className="text-xs font-bold tracking-widest text-brand-purple uppercase">Nível de Integração</span>
            <h3 className="text-2xl font-bold text-white">
              {content.integrationLevels[2].level}
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              <strong>Foco:</strong> {content.integrationLevels[2].focus}
            </p>
            <p className="text-sm text-gray-400 italic">
              <strong>Resultado:</strong> {content.integrationLevels[2].result}
            </p>
            <div className="flex gap-2 pt-2 border-t border-white/5">
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400 uppercase font-semibold">Eva Pierrakos</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400 uppercase font-semibold">Pw 193</span>
            </div>
          </div>

          {/* Card 4: Sintoma - Cansaço */}
          <div className="fase-2-card opacity-0 absolute glass-card rounded-2xl p-8 space-y-4 max-w-lg transition-all duration-100 ease-out">
            <span className="text-xs font-bold tracking-widest text-brand-green uppercase">Dores Comuns</span>
            <h3 className="text-2xl font-bold text-white">{content.symptoms[0].title}</h3>
            <p className="text-sm text-red-300 leading-relaxed">
              <strong>Causa:</strong> {content.symptoms[0].cause}
            </p>
            <p className="text-sm text-brand-green font-light">
              <strong>Resolução:</strong> {content.symptoms[0].solution}
            </p>
            <div className="flex gap-2 pt-2 border-t border-white/5">
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400 uppercase font-semibold">Pw 109</span>
            </div>
          </div>

          {/* Card 5: Sintoma - Entorpecimento */}
          <div className="fase-2-card opacity-0 absolute glass-card rounded-2xl p-8 space-y-4 max-w-lg transition-all duration-100 ease-out">
            <span className="text-xs font-bold tracking-widest text-brand-green uppercase">Dores Comuns</span>
            <h3 className="text-2xl font-bold text-white">{content.symptoms[1].title}</h3>
            <p className="text-sm text-red-300 leading-relaxed">
              <strong>Causa:</strong> {content.symptoms[1].cause}
            </p>
            <p className="text-sm text-brand-green font-light">
              <strong>Resolução:</strong> {content.symptoms[1].solution}
            </p>
            <div className="flex gap-2 pt-2 border-t border-white/5">
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400 uppercase font-semibold">Pw 070</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400 uppercase font-semibold">Pw 196</span>
            </div>
          </div>

          {/* Card 6: Sintoma - Medos */}
          <div className="fase-2-card opacity-0 absolute glass-card rounded-2xl p-8 space-y-4 max-w-lg transition-all duration-100 ease-out">
            <span className="text-xs font-bold tracking-widest text-brand-green uppercase">Dores Comuns</span>
            <h3 className="text-2xl font-bold text-white">{content.symptoms[2].title}</h3>
            <p className="text-sm text-red-300 leading-relaxed">
              <strong>Causa:</strong> {content.symptoms[2].cause}
            </p>
            <p className="text-sm text-brand-green font-light">
              <strong>Resolução:</strong> {content.symptoms[2].solution}
            </p>
            <div className="flex gap-2 pt-2 border-t border-white/5">
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400 uppercase font-semibold">Pw 057</span>
            </div>
          </div>

          {/* Card 7: Sintoma - Culpa */}
          <div className="fase-2-card opacity-0 absolute glass-card rounded-2xl p-8 space-y-4 max-w-lg transition-all duration-100 ease-out">
            <span className="text-xs font-bold tracking-widest text-brand-green uppercase">Dores Comuns</span>
            <h3 className="text-2xl font-bold text-white">{content.symptoms[3].title}</h3>
            <p className="text-sm text-red-300 leading-relaxed">
              <strong>Causa:</strong> {content.symptoms[3].cause}
            </p>
            <p className="text-sm text-brand-green font-light">
              <strong>Resolução:</strong> {content.symptoms[3].solution}
            </p>
            <div className="flex gap-2 pt-2 border-t border-white/5">
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400 uppercase font-semibold">Pw 004</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400 uppercase font-semibold">Pw 089</span>
            </div>
          </div>

          {/* Card 8: Sintoma - Vitimismo */}
          <div className="fase-2-card opacity-0 absolute glass-card rounded-2xl p-8 space-y-4 max-w-lg transition-all duration-100 ease-out">
            <span className="text-xs font-bold tracking-widest text-brand-green uppercase">Dores Comuns</span>
            <h3 className="text-2xl font-bold text-white">{content.symptoms[4].title}</h3>
            <p className="text-sm text-red-300 leading-relaxed">
              <strong>Causa:</strong> {content.symptoms[4].cause}
            </p>
            <p className="text-sm text-brand-green font-light">
              <strong>Resolução:</strong> {content.symptoms[4].solution}
            </p>
            <div className="flex gap-2 pt-2 border-t border-white/5">
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400 uppercase font-semibold">Pw 193</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400 uppercase font-semibold">Pw 246</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* FASE 3: Centralized Light Theme Layer (Frames 166-240) */}
      {/* ========================================================================= */}
      <section
        id="final-layer"
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl px-6 z-10 opacity-0 pointer-events-none transition-all duration-300 overflow-y-auto max-h-[85vh] pr-4 select-none"
        style={{ color: "#0b0b0c" }}
        data-intent="faq"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-8">
          
          {/* Left Column: CTA & Regions */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-block px-3 py-1 rounded bg-[#8a2be2]/10 border border-[#8a2be2]/20 text-[#8a2be2] text-xs font-bold tracking-widest uppercase">
              Contato & Agendamento
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0b0b0c] leading-tight">
              {content.contact.ctaTitle}
            </h2>
            <p className="text-sm text-[#2b2b2c] leading-relaxed">
              {content.contact.ctaSubtitle}
            </p>

            {/* Regions list */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#0b0b0c] uppercase tracking-wider">Cidades Atendidas</h4>
              <div className="grid grid-cols-1 gap-2">
                {content.contact.regions.map((reg, idx) => (
                  <div key={idx} className="flex justify-between p-3 rounded-lg bg-black/5 border border-black/5">
                    <span className="text-xs font-bold text-[#0b0b0c]">{reg.city}</span>
                    <span className="text-[10px] text-gray-500 font-light">{reg.formats} • {reg.mode}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Magnetic Button */}
            <div className="pt-2 flex justify-start">
              <a
                href={content.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-btn inline-block px-8 py-3.5 rounded-lg bg-brand-green text-white font-bold text-sm tracking-wide shadow-[0_4px_14px_rgba(0,168,107,0.3)] hover:bg-[#00965e] transition-colors"
              >
                FALE VIA WHATSAPP
              </a>
            </div>
          </div>

          {/* Right Column: FAQ */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-lg font-bold text-[#0b0b0c] border-b border-black/10 pb-2">Perguntas Frequentes</h3>
            <div className="space-y-3">
              {content.faqs.map((faq, idx) => (
                <details
                  className="faq-item group bg-black/5 border border-black/10 rounded-xl overflow-hidden"
                  key={idx}
                >
                  <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-black/10 transition-colors">
                    <span className="font-semibold text-xs md:text-sm text-[#0b0b0c]">{faq.question}</span>
                    <span className="transition duration-300 group-open:rotate-180 text-gray-500">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </summary>
                  <div className="faq-answer-container border-t border-black/10 p-4">
                    <p className="text-xs md:text-sm text-[#2b2b2c] leading-relaxed">
                      {faq.answer}
                    </p>
                    {faq.tags && faq.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {faq.tags.map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className="text-[9px] font-bold text-brand-purple bg-brand-purple/10 border border-brand-purple/20 px-2 py-0.5 rounded uppercase"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
