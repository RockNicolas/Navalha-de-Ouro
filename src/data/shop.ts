import type { IconName } from '../components/ui/Icon';

/* Conteúdo da barbearia fictícia Navalha de Ouro. */

export const HOURS = [
  { label: 'Segunda a sexta', time: '09:00 às 19:00', days: [1, 2, 3, 4, 5] },
  { label: 'Sábado', time: '09:00 às 16:00', days: [6] },
  { label: 'Domingo', time: 'Fechado', days: [0] },
];

export const AMENITIES = ['Wi-Fi grátis', 'Cerveja gelada', 'Ar-condicionado', 'Cartão e Pix', 'Estacionamento ao lado'];

export interface Review {
  name: string;
  stars: number;
  when: string;
  text: string;
}

export const REVIEWS: Review[] = [
  { name: 'Lucas M.', stars: 5, when: 'há 2 dias', text: 'Melhor degradê que já fiz. O Rafael é muito detalhista e agendar pelo site é rapidinho.' },
  { name: 'André C.', stars: 5, when: 'há 1 semana', text: 'Assino o Clube há 6 meses e compensa demais. Nunca mais fiquei sem horário.' },
  { name: 'Pedro N.', stars: 5, when: 'há 2 semanas', text: 'Ambiente top, cerveja gelada e pontualidade. O lembrete no WhatsApp salva quem esquece igual eu.' },
  { name: 'Gustavo R.', stars: 5, when: 'há 3 semanas', text: 'Levei meu filho com o Thiago, paciência de outro mundo. Voltaremos!' },
  { name: 'Felipe S.', stars: 5, when: 'há 1 mês', text: 'Barba com toalha quente do Diego é outro nível. Saí novo.' },
  { name: 'Bruno A.', stars: 4, when: 'há 1 mês', text: 'Ótimo atendimento. Sábado fica bem cheio, então vale agendar antes.' },
];

export const RATING_BARS = [
  { stars: 5, pct: 89 },
  { stars: 4, pct: 8 },
  { stars: 3, pct: 2 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 0 },
];

export interface GalleryItem {
  title: string;
  caption: string;
  icon: IconName;
  hue: number;
  /** Caminho de uma foto em /public (ex.: '/galeria/degrade.jpg'). Sem foto, mostra a arte. */
  image?: string;
}

export const GALLERY: GalleryItem[] = [
  { title: 'Degradê navalhado', caption: 'com o Rafael', icon: 'scissors', hue: 38 },
  { title: 'Barba desenhada', caption: 'toalha quente e navalha', icon: 'razor', hue: 4 },
  { title: 'Social clássico', caption: 'pro dia a dia e pro trabalho', icon: 'scissors', hue: 212 },
  { title: 'Corte infantil', caption: 'com paciência de sobra', icon: 'star', hue: 150 },
  { title: 'Pigmentação', caption: 'realça o desenho', icon: 'zap', hue: 28 },
  { title: 'O espaço', caption: 'cerveja gelada e boa conversa', icon: 'coffee', hue: 260 },
];
