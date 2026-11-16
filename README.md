# Barbearia Navalha de Ouro · site de demonstração

Site de uma barbearia **fictícia**, a Navalha de Ouro, feito pela Rock Software Solutions para mostrar
como fica uma barbearia com todas as soluções funcionando. São **duas páginas separadas**:

| Endereço | Quem usa | O que tem |
| --- | --- | --- |
| `/` | Qualquer pessoa | Site da barbearia: serviços, equipe, agendamento, lembrete, Clube, avaliações e localização. **Nenhum link para o painel.** |
| `/painel` | Só a equipe | Tela de login e, depois dela, o sistema de gestão: agenda, clientes, financeiro, comissões e lembretes. Não aparece no Google (`noindex`). |

| Solução | Onde está |
| --- | --- |
| Site profissional | A página `/` inteira |
| Agendamento online | Seção **Agendar** (os botões "Agendar" em Serviços e Equipe já abrem com a escolha feita) |
| Lembretes automáticos | Chat do WhatsApp ao lado do agendamento + aba **Lembretes** no painel |
| Sistema de gestão | Página `/painel` |
| Assinatura e fidelidade | Seção **Clube**: planos mensais e cartão fidelidade digital |

Feito com **React 19 + TypeScript + Vite**, sem bibliotecas extras.

## Login do painel (demonstração)

Na tela de login há o botão **Entrar como dono** e um botão para cada barbeiro. Também dá para digitar
(senha `demo123` para todos):

| Perfil | E-mail | O que vê |
| --- | --- | --- |
| Dono (Marcelo) | `dono@navalhadeouro.com.br` | Tudo: agenda geral, **Equipe** (desempenho e painel de cada barbeiro), clientes, financeiro, comissões e lembretes |
| Barbeiro Rafael | `rafael@navalhadeouro.com.br` | Só o dele: **Meu mês**, Minha agenda e Minhas comissões |
| Barbeiro Diego | `diego@navalhadeouro.com.br` | Só o dele |
| Barbeiro Thiago | `thiago@navalhadeouro.com.br` | Só o dele |

**Meu mês** (painel individual): atendimentos e cortes no mês, faturado, comissão a receber, avaliação,
serviços feitos, agenda de hoje com o próximo cliente e faturamento da semana. O dono vê esse mesmo painel
de cada barbeiro pela aba **Equipe**.

Os números de exemplo saem de uma única fonte (`BARBER_MONTH` em `src/data/demo.ts`): a soma dos barbeiros
é o faturamento da barbearia no financeiro e nas comissões.

> Esse login é **simulado no navegador**, só para demonstrar a separação. Para um cliente real, o login e os
> agendamentos precisam de um servidor (ex.: Supabase), e cada pessoa tem a sua própria senha.

## Rodar

```bash
npm install
npm run dev        # site: http://localhost:5173  ·  painel: http://localhost:5173/painel
npm run build      # checa tipos e gera a pasta dist/ (pronta para a Vercel)
npm run preview    # serve o build de produção
npm run deploy     # gera o build com o caminho do GitHub Pages e publica na branch gh-pages
```

## Publicar

- **Vercel:** importe o repositório `RockNicolas/Navalha-de-Ouro` em vercel.com (Add New → Project). A Vercel
  detecta o Vite sozinha; não precisa mudar nada. Cada `git push` na `main` publica de novo. O `vercel.json`
  garante que `/painel` abra o painel.
- **GitHub Pages:** https://rocknicolas.github.io/Navalha-de-Ouro/ (painel em `.../Navalha-de-Ouro/painel/`).
  Atualize com `npm run deploy`.

## Roteiro sugerido para apresentar

1. Abra o **painel** numa aba e entre como dono. Abra o **site** em outra aba.
2. No site, mostre o topo: "Aberto agora" e "Próximo horário livre" são calculados na hora.
3. Em **Equipe**, clique em "Agendar com Diego" e faça um agendamento até o fim.
4. Veja o lembrete aparecer no chat do WhatsApp e responda "Confirmar".
5. Volte para a aba do painel: o agendamento já está lá, destacado como "novo · online".
   Mostre Clientes, Financeiro, Comissões e Lembretes.
6. Clique em **Sair** e entre como barbeiro para mostrar que ele só vê os dados dele.

## Personalizar

- **Dados da barbearia** (nome, endereço, nota, WhatsApp): `src/config.ts`.
- **WhatsApp da Rock** (link do crédito no rodapé): `ROCK_WHATSAPP` em `src/config.ts`.
- **Serviços, preços e barbeiros:** `src/data/catalog.ts`.
- **Avaliações, horários, galeria:** `src/data/shop.ts`. Para usar fotos reais na galeria, coloque os
  arquivos em `public/galeria/` e preencha `image: 'galeria/arquivo.jpg'` (sem barra no início) em cada item.
- **Dados do painel** (agenda, clientes, financeiro, planos): `src/data/demo.ts`.
- **Usuários de demonstração do painel:** `src/lib/session.ts`.

## Estrutura

```
index.html               página do site
painel/index.html        página do painel (separada)
src/
  main.tsx               entrada do site
  painel.tsx             entrada do painel
  config.ts              dados da barbearia e números de WhatsApp
  data/                  catálogo, conteúdo da barbearia e dados de exemplo do painel
  lib/                   formatação, datas, horários, .ics, WhatsApp, localStorage, sessão do painel
  hooks/                 usePersistentState, useScrollSpy, useNow
  context/AppContext.tsx agendamentos (sincronizados entre abas), avisos e aba do painel
  components/
    layout/              Header, Footer, botão do WhatsApp, Toast
    sections/            Hero (com o selo), Services, Team, Gallery, Reviews, Location, CtaBand
    booking/             agendamento em etapas + chat do lembrete
    loyalty/             planos do Clube e cartão fidelidade
    panel/               login e moldura do painel
    management/          módulos do sistema: agenda, clientes, financeiro, comissões, lembretes
    ui/                  Icon, Reveal, SectionHead, Avatar
```

Nada é enviado a servidor: agendamentos, selos e plano escolhido ficam no `localStorage` do navegador.
