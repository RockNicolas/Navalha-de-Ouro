# Barbearia Navalha de Ouro · site de demonstração

Site de uma barbearia **fictícia**, a Navalha de Ouro, feito pela Rock Software Solutions para mostrar
a clientes como fica uma barbearia com todas as soluções funcionando:

| Solução | Onde está no site |
| --- | --- |
| Site profissional | A página inteira: serviços e preços, equipe, estilos, avaliações, mapa e horários |
| Agendamento online | Seção **Agendar** (botões "Agendar" em Serviços e Equipe já abrem com a escolha feita) |
| Lembretes automáticos | Chat do WhatsApp ao lado do agendamento + aba **Lembretes** no painel |
| Sistema de gestão | **Área da equipe** (link no topo e no rodapé, ou `/#painel`) |
| Assinatura e fidelidade | Seção **Clube**: planos mensais e cartão fidelidade digital |

Feito com **React 19 + TypeScript + Vite**, sem bibliotecas extras.

## Rodar

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # checa tipos e gera a pasta dist/
npm run preview    # serve o build de produção
```

## Roteiro sugerido para apresentar

1. Mostre o topo: status "Aberto agora" e "Próximo horário livre" são calculados na hora.
2. Em **Equipe**, clique em "Agendar com Diego" e faça um agendamento até o fim.
3. Veja o lembrete aparecer no chat do WhatsApp e responda "Confirmar".
4. Clique em "ver como esse horário chegou no painel": a **Área da equipe** abre com o agendamento
   destacado. Mostre Clientes, Financeiro, Comissões e Lembretes.
5. Feche o painel e mostre o **Clube** (planos e cartão fidelidade).

Para abrir direto no painel: `http://localhost:5173/#painel`.

## Personalizar

- **Dados da barbearia** (nome, endereço, nota, WhatsApp): `src/config.ts`.
- **WhatsApp da Rock** (link do crédito no rodapé): `ROCK_WHATSAPP` em `src/config.ts`.
- **Serviços, preços e barbeiros:** `src/data/catalog.ts`.
- **Avaliações, horários, galeria:** `src/data/shop.ts`. Para usar fotos reais na galeria, coloque os
  arquivos em `public/galeria/` e preencha `image: '/galeria/arquivo.jpg'` em cada item.
- **Dados do painel** (agenda, clientes, financeiro, planos): `src/data/demo.ts`.

## Estrutura

```
src/
  config.ts              dados da barbearia e números de WhatsApp
  data/                  catálogo, conteúdo da barbearia e dados de exemplo do painel
  lib/                   formatação, datas, horários, funcionamento, .ics, WhatsApp, localStorage
  hooks/                 usePersistentState, useScrollSpy, useNow
  context/AppContext.tsx agendamentos, avisos, pedido de agendamento e Área da equipe
  components/
    layout/              Header, Footer, botão do WhatsApp, Toast
    sections/            Hero (com o selo), Services, Team, Gallery, Reviews, Location, CtaBand
    booking/             agendamento em etapas + chat do lembrete
    loyalty/             planos do Clube e cartão fidelidade
    management/          Área da equipe: agenda, clientes, financeiro, comissões, lembretes
    ui/                  Icon, Reveal, SectionHead, Avatar
```

Nada é enviado a servidor: agendamentos, selos e plano escolhido ficam no `localStorage` do navegador.
