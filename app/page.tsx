import Link from 'next/link'
import { Calendar, Users, Clock, TrendingUp, Star, Sparkles, Zap, Shield } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#05070C] text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#38BDF8]/10 rounded-full blur-[150px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0F131C_1px,transparent_1px),linear-gradient(to_bottom,#0F131C_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#38BDF8]/30 bg-[#38BDF8]/10 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-[#38BDF8]" />
              <span className="text-sm text-gray-300 font-medium">Teste grátis por 30 dias</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-tight">
              <span className="block text-white mb-2">
                Sistema completo
              </span>
              <span className="block bg-gradient-to-r from-[#38BDF8] via-[#0EA5E9] to-[#0284C7] bg-clip-text text-transparent">
                para sua barbearia
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 max-w-3xl leading-relaxed px-4">
              Controle agendamentos, gerencie clientes e <span className="text-white font-semibold">aumente seu faturamento em até 40%</span>. Tudo em um só lugar.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0">
              <Link
                href="/sign-up"
                className="group px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] text-white font-bold rounded-full transition-all text-base sm:text-lg shadow-[0_0_40px_rgba(56,189,248,0.3)] hover:shadow-[0_0_60px_rgba(56,189,248,0.5)] hover:scale-105 transform text-center"
              >
                <span className="flex items-center justify-center gap-2">
                  Começar agora
                  <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </span>
              </Link>
              <Link
                href="#features"
                className="px-8 sm:px-10 py-4 sm:py-5 border-2 border-gray-700 hover:border-[#38BDF8] bg-transparent backdrop-blur-sm text-white font-bold rounded-full transition-all text-base sm:text-lg hover:bg-[#38BDF8]/10 text-center"
              >
                Ver demonstração
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 text-sm pt-8">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#05070C] bg-gradient-to-br from-[#38BDF8] to-[#0EA5E9] flex items-center justify-center text-white text-xs font-semibold">
                      {i}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-[#38BDF8] text-[#38BDF8]" />
                    ))}
                  </div>
                  <p className="text-gray-400 text-xs">+200 barbearias</p>
                </div>
              </div>
              <div className="h-px w-32 sm:h-8 sm:w-px bg-gray-800"></div>
              <div className="flex items-center gap-2 text-gray-400">
                <Shield className="w-5 h-5 text-[#38BDF8] flex-shrink-0" />
                <span className="text-xs sm:text-sm">Sem cartão • Cancele quando quiser</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 bg-[#0A0D12]">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 sm:mb-6">
              <span className="block text-white mb-2">
                Tudo que você precisa em
              </span>
              <span className="block bg-gradient-to-r from-[#38BDF8] via-[#0EA5E9] to-[#0284C7] bg-clip-text text-transparent">
                um só sistema
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto px-4">
              Ferramentas profissionais para transformar sua barbearia em um negócio de alto desempenho
            </p>
          </div>

          <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <FeatureCard
              icon={<Calendar className="w-10 h-10 sm:w-12 sm:h-12" />}
              title="Agenda Visual"
              description="Veja todos os horários do dia em uma interface simples e rápida"
              gradient="from-[#38BDF8] to-[#0EA5E9]"
            />
            <FeatureCard
              icon={<Users className="w-10 h-10 sm:w-12 sm:h-12" />}
              title="CRM Integrado"
              description="Histórico completo de cada cliente, telefone e preferências"
              gradient="from-[#0EA5E9] to-[#0284C7]"
            />
            <FeatureCard
              icon={<Clock className="w-10 h-10 sm:w-12 sm:h-12" />}
              title="Notificações"
              description="WhatsApp automático para confirmar e lembrar agendamentos"
              gradient="from-[#0284C7] to-[#0369A1]"
            />
            <FeatureCard
              icon={<TrendingUp className="w-10 h-10 sm:w-12 sm:h-12" />}
              title="Multi-barbeiros"
              description="Gerencie a agenda de cada profissional separadamente"
              gradient="from-[#0369A1] to-[#38BDF8]"
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 bg-[#05070C]">
        {/* Background glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-[#38BDF8]/10 rounded-full blur-[150px]"></div>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 sm:mb-6">
              <span className="block text-white">
                Simples e transparente
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 px-4">
              Um único plano com tudo incluído. Sem surpresas.
            </p>
          </div>

          <div className="relative group max-w-lg mx-auto">
            {/* Gradient border */}
            <div className="absolute -inset-[2px] bg-gradient-to-r from-[#38BDF8] via-[#0EA5E9] to-[#0284C7] rounded-3xl opacity-75 blur-sm transition-all duration-300"></div>

            <div className="relative bg-[#0F131C] rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-xl">
              {/* Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="px-4 sm:px-6 py-2 bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] rounded-full text-white text-xs sm:text-sm font-bold shadow-lg whitespace-nowrap">
                  🔥 MAIS POPULAR
                </div>
              </div>

              <div className="mb-6 sm:mb-8 mt-6 sm:mt-4">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-gray-500 text-xl sm:text-2xl line-through">R$ 97</span>
                  <span className="text-5xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] bg-clip-text text-transparent">R$ 37</span>
                  <span className="text-gray-400 text-xl sm:text-2xl font-semibold">/mês</span>
                </div>
                <p className="text-[#38BDF8] font-semibold mt-2 text-sm sm:text-base">Economia de R$ 720/ano</p>
              </div>

              <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                {[
                  'Agendamentos ilimitados',
                  'Até 5 profissionais',
                  'CRM completo',
                  'Notificações WhatsApp',
                  'Suporte prioritário',
                  'Relatórios avançados',
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#38BDF8]/20 flex items-center justify-center">
                      <span className="text-[#38BDF8] font-bold text-base">✓</span>
                    </div>
                    <span className="text-gray-300 text-sm sm:text-base lg:text-lg">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/sign-up"
                className="group/btn block w-full px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] text-white font-bold rounded-full transition-all text-base sm:text-lg shadow-[0_0_30px_rgba(56,189,248,0.3)] hover:shadow-[0_0_50px_rgba(56,189,248,0.5)] hover:scale-105 transform"
              >
                <span className="flex items-center justify-center gap-2">
                  Começar agora
                  <Zap className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                </span>
              </Link>

              <p className="text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6 text-center">
                🔒 Pagamento seguro • Cancele quando quiser
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 bg-[#0A0D12]">
        {/* Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#38BDF8_1px,transparent_1px),linear-gradient(to_bottom,#38BDF8_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.03] pointer-events-none"></div>

        <div className="relative mx-auto max-w-5xl">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#38BDF8]/30 bg-[#38BDF8]/10 backdrop-blur-sm">
              <div className="w-2 h-2 bg-[#38BDF8] rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm text-gray-300 font-medium">+200 barbearias já estão usando</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tight leading-tight">
              <span className="block text-white mb-2">
                Pronto para modernizar
              </span>
              <span className="block bg-gradient-to-r from-[#38BDF8] via-[#0EA5E9] to-[#0284C7] bg-clip-text text-transparent">
                sua barbearia?
              </span>
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-3xl px-4">
              Comece seu teste gratuito hoje e veja como é fácil aumentar seu faturamento
            </p>

            <div className="w-full sm:w-auto px-4 sm:px-0 pt-4">
              <Link
                href="/sign-up"
                className="group inline-block px-10 sm:px-12 py-5 sm:py-6 bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] text-white font-bold rounded-full transition-all text-lg sm:text-xl shadow-[0_0_50px_rgba(56,189,248,0.4)] hover:shadow-[0_0_80px_rgba(56,189,248,0.6)] hover:scale-105 transform"
              >
                <span className="flex items-center justify-center gap-2">
                  Começar teste grátis
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
                </span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-8 w-full max-w-3xl pt-8 sm:pt-12">
              <div className="text-center">
                <div className="text-4xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] bg-clip-text text-transparent mb-2">
                  +200
                </div>
                <div className="text-gray-400 text-xs sm:text-sm font-medium">Barbearias ativas</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] bg-clip-text text-transparent mb-2">
                  40%
                </div>
                <div className="text-gray-400 text-xs sm:text-sm font-medium">Aumento médio de faturamento</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] bg-clip-text text-transparent mb-2">
                  4.9
                </div>
                <div className="flex items-center justify-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-[#38BDF8] text-[#38BDF8]" />
                  ))}
                </div>
                <div className="text-gray-400 text-xs sm:text-sm font-medium">Avaliação média</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-[#05070C]">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <div className="text-xl sm:text-2xl font-black bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] bg-clip-text text-transparent mb-2">
                Barbearia SaaS
              </div>
              <p className="text-gray-500 text-xs sm:text-sm">
                © 2024 Todos os direitos reservados.
              </p>
            </div>
            <div className="flex gap-6 sm:gap-8 text-xs sm:text-sm text-gray-400">
              <Link href="#" className="hover:text-[#38BDF8] transition-colors">
                Termos de Uso
              </Link>
              <Link href="#" className="hover:text-[#38BDF8] transition-colors">
                Privacidade
              </Link>
              <Link href="#" className="hover:text-[#38BDF8] transition-colors">
                Suporte
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  gradient,
}: {
  icon: React.ReactNode
  title: string
  description: string
  gradient: string
}) {
  return (
    <div className="group relative">
      {/* Hover glow effect */}
      <div className={`absolute -inset-[1px] bg-gradient-to-r ${gradient} rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-300`}></div>

      <div className="relative h-full bg-[#0F131C]/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 sm:p-8 hover:border-transparent transition-all duration-300 group-hover:transform group-hover:scale-[1.02]">
        {/* Icon container with gradient */}
        <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${gradient} p-0.5 mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
          <div className="w-full h-full bg-[#0F131C] rounded-[10px] flex items-center justify-center">
            <div className={`bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}>
              {icon}
            </div>
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
