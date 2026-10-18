export type Project = {
  slug: string;
  number: string;
  title: string;
  category: string;
  kind: 'placeholder' | 'published';
  year: string;
  cover: string;
  coverAlt: string;
  summary: string;
  description: string;
  tools: string[];
  gallery: { src: string; alt: string }[];
  liveUrl?: string;
  sourceUrl?: string;
};

// Substitua os espaços abaixo pelos seus trabalhos e troque kind para 'published'.
export const projects: Project[] = [
  {
    slug: 'forma-e-identidade', number: '01', title: 'Forma & identidade',
    category: 'Design visual', kind: 'placeholder', year: 'Em breve',
    cover: '/art/forma.svg', coverAlt: 'Composição tipográfica vermelha e preta com a palavra FORMA e um asterisco geométrico.',
    summary: 'Uma linguagem visual com coisa pra dizer.',
    description: 'Este espaço está reservado para um futuro projeto de design e identidade visual. Por enquanto, a capa é um estudo gráfico criado para este portfólio. O processo, as escolhas e o trabalho completo chegam aqui em breve.',
    tools: [], gallery: [],
  },
  {
    slug: 'interfaces-vivas', number: '02', title: 'Interfaces vivas',
    category: 'Desenvolvimento web', kind: 'placeholder', year: 'Em breve',
    cover: '/art/interface.svg', coverAlt: 'Estudo editorial em papel cru com uma esfera formada por linhas pretas e um pequeno quadrado vermelho.',
    summary: 'Código que também se sente.',
    description: 'Este espaço vai reunir um projeto de desenvolvimento web: da primeira ideia à interface funcionando. A composição que você vê é um estudo visual de apresentação, não um produto ou cliente anunciado.',
    tools: [], gallery: [],
  },
  {
    slug: 'fora-do-eixo', number: '03', title: 'Fora do eixo',
    category: 'Experimentos', kind: 'placeholder', year: 'Em breve',
    cover: '/art/eixo.svg', coverAlt: 'Pôster experimental preto com círculos concêntricos vermelhos e tipografia branca fora do eixo.',
    summary: 'Um lugar pra testar o que ainda não tem nome.',
    description: 'Um espaço aberto para estudos de movimento, imagens e outras ideias difíceis de encaixar em uma categoria. Esta capa é uma exploração visual do próprio portfólio. Novos experimentos entram aqui em breve.',
    tools: [], gallery: [],
  },
];
