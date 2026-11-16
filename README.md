# Landing page · Rock Software Solutions para barbearias

Página de apresentação com demonstrações interativas das 5 soluções: site profissional,
agendamento online, lembretes automáticos, sistema de gestão e assinatura/fidelidade.

Feita com **React 19 + TypeScript + Vite**, sem bibliotecas extras.

## Rodar

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # checa tipos e gera a pasta dist/
npm run preview    # serve o build de produção
```

## Antes de apresentar

1. **Número do WhatsApp:** em `src/config.ts`, troque `WHATSAPP_NUMBER` pelo número da Rock
   (só dígitos, com DDI e DDD, ex.: `5511999998888`). Todos os botões de WhatsApp usam esse valor.
2. **Nome do cliente:** no campo "Apresentando para", logo abaixo do topo, digite o nome da
   barbearia. A página inteira passa a usar esse nome (fica salvo no navegador).

## Estrutura

```
src/
  config.ts              número do WhatsApp e chaves de armazenamento
  types.ts               tipos compartilhados
  data/                  catálogo (serviços, barbeiros) e dados de exemplo das demos
  lib/                   formatação, datas, horários, .ics, WhatsApp, localStorage
  hooks/                 usePersistentState, useScrollSpy
  context/AppContext.tsx nome da barbearia, agendamentos, avisos e aba do painel
  components/
    layout/              Header, Footer, botão flutuante, Toast
    sections/            Hero, Personalize, Solutions, SiteDemo, Roadmap, Contact
    booking/             widget de agendamento em etapas + chat do lembrete
    management/          painel com abas: agenda, clientes, financeiro, comissões
    loyalty/             planos do clube e cartão fidelidade
    ui/                  Icon, Reveal, SectionHead, Avatar
```

Todos os dados das demonstrações são de exemplo. Nada é enviado a servidor: agendamentos,
selos e plano escolhido ficam só no `localStorage` do navegador.
