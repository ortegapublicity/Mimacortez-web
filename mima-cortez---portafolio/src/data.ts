import { Instagram, Linkedin, Palette, ExternalLink, Newspaper, BookOpen, Quote } from 'lucide-react';

export const socialLinks = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/mimacortez/',
    icon: Instagram,
    color: 'hover:text-pink-500',
  },
  {
    name: 'LinkedIn',
    url: 'https://ve.linkedin.com/in/mimacortez',
    icon: Linkedin,
    color: 'hover:text-blue-500',
  },
  {
    name: 'Behance',
    url: 'https://www.behance.net/mimacortez2',
    icon: Palette,
    color: 'hover:text-blue-400',
  },
];

export const pressArticles = [
  {
    title: 'Tarot Afro Queer: la apuesta por honrar la fe de las disidencias',
    source: 'Malvestida',
    url: 'https://malvestida.com/2024/02/tarot-afro-queer-la-apuesta-de-la-artista-mima-cortez-por-honrar-la-fe-de-las-disidencias/',
    date: 'Febrero 2024',
    category: 'Arte y Disidencia',
    icon: BookOpen,
  },
  {
    title: 'Entrevista: "Mientras más personas puedan comprender el racismo, se podrá generar una mejor gestión de los activismos"',
    source: 'Provea',
    url: 'https://provea.org/actualidad/entrevista-mima-cortes-mientras-mas-personas-puedan-comprender-el-racismo-y-como-nos-afecta-a-las-personas-racializadas-se-podra-generar-una-mejor-gestion-de-los-activismos/',
    date: 'Actualidad',
    category: 'Derechos Humanos',
    icon: Quote,
  },
  {
    title: 'La moda como arma que reivindica y reconstruye dignidad',
    source: 'Esbaratao / DDHH',
    url: 'https://esbaratao.org/ddhh/mima-cortez-moda-arma-reivindica-reconstruye-dignidad/',
    date: 'Entrevista',
    category: 'Moda y Activismo',
    icon: Newspaper,
  },
  {
    title: 'Los rostros de las mujeres que marchan juntas en las calles de Caracas por el 8M',
    source: 'El País',
    url: 'https://elpais.com/america/2026-03-08/los-rostros-de-las-mujeres-chavistas-y-opositoras-que-marchan-juntas-en-las-calles-de-caracas-por-el-8m.html',
    date: 'Marzo 2026',
    category: 'Feminismo',
    icon: Newspaper,
  },
  {
    title: 'Fashion Revolution Venezuela',
    source: 'Fashion Revolution',
    url: 'https://www.fashionrevolution.org/south-america/venezuela/',
    date: 'Campaña',
    category: 'Moda Sostenible',
    icon: ExternalLink,
  },
  {
    title: 'Artículos de Mima Cortez',
    source: 'Todxs Podemos Ser',
    url: 'https://todxspodemosser.com/author/mima/',
    date: 'Autora',
    category: 'Publicaciones',
    icon: BookOpen,
  },
];
