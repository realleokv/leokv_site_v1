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
    slug: 'bhagya-collection-site',
    number: '01',
    title: 'Bhagya Collection',
    category: 'Desenvolvimento Web & Design',
    kind: 'published',
    year: '2026',
    cover: '/art/bhagya.svg',
    coverAlt: 'Interface do site Bhagya Collection, marca de moda independente com estética editorial.',
    summary: 'Uma experiência digital onde moda, identidade e tecnologia se encontram.',
    description: 'Desenvolvimento de uma experiência web para a Bhagya Collection, marca independente de moda cujo nome, originário do sânscrito, remete à sorte e ao destino. O projeto transforma esse conceito em uma identidade digital autoral, inspirada em revistas de moda, colagens analógicas e editoriais contemporâneos. Desenvolvido com React, TypeScript e Vite, o site apresenta animações cinematográficas com GSAP, navegação fluida com Lenis, elementos tridimensionais interativos utilizando Three.js e transições com Framer Motion. A experiência inclui manifesto da marca, catálogo de produtos, páginas individuais das peças, lookbook, seleção de variações e integração configurável para pedidos via WhatsApp. O projeto combina direção de arte, desenvolvimento front-end, responsividade e interatividade para criar uma presença digital que vai além de uma loja convencional.',
    tools: [
      'React',
      'TypeScript',
      'Vite',
      'Three.js',
      'React Three Fiber',
      'GSAP',
      'Lenis',
      'Framer Motion',
      'GLSL',
      'CSS'
    ],
    gallery: [],
  },
  {
    slug: 'datilologia-libras',
    number: '02',
    title: 'Datilologia LIBRAS',
    category: 'Inteligência Artificial & Acessibilidade',
    kind: 'published',
    year: '2026',
    cover: '/art/libras_vision.svg',
    coverAlt: 'Projeto de reconhecimento de sinais da Língua Brasileira de Sinais por inteligência artificial.',
    summary: 'Tecnologia que reconhece gestos, interpreta sinais e aproxima pessoas.',
    description: 'Desenvolvimento de uma aplicação web de reconhecimento de sinais da Língua Brasileira de Sinais (LIBRAS), utilizando visão computacional e aprendizado de máquina. O projeto, ainda em desenvolvimento, utiliza Python, MediaPipe Hands e modelos de classificação para identificar posições e movimentos das mãos capturados por câmera, com foco no reconhecimento do alfabeto manual e na futura interpretação de expressões básicas. A arquitetura integra um servidor Flask, comunicação em tempo real com Flask-SocketIO e uma interface web interativa, permitindo utilizar a câmera do celular como dispositivo de captura. O sistema também conta com treinamento de modelos a partir de pontos de referência das mãos (landmarks), processamento de dados e classificação de gestos. A iniciativa busca explorar o potencial da inteligência artificial como ferramenta de acessibilidade, inclusão e aproximação entre tecnologia e comunicação humana.',
    tools: [
      'Python',
      'MediaPipe Hands',
      'Machine Learning',
      'Flask',
      'Flask-SocketIO',
      'OpenCV',
      'JavaScript',
      'HTML',
      'CSS',
      'WebSocket'
    ],
    gallery: [],
    sourceUrl: 'https://github.com/realleokv/teste'
  },
  {
    slug: 'air-drums',
    number: '03',
    title: 'Air Drums',
    category: 'Visão Computacional & Interatividade',
    kind: 'published',
    year: '2026',
    cover: '/art/air_drums.svg',
    coverAlt: 'Projeto Air Drums, bateria virtual interativa controlada por movimentos das mãos.',
    summary: 'Transformando movimentos no ar em música através da visão computacional.',
    description: 'Desenvolvimento de um sistema experimental de bateria virtual que utiliza visão computacional para transformar movimentos das mãos em interações musicais em tempo real. O projeto propõe uma experiência na qual o usuário utiliza a câmera do celular para transmitir imagens ao computador, enquanto algoritmos de rastreamento identificam a posição e o movimento das mãos para simular o toque em instrumentos de percussão virtuais. A aplicação utiliza Python, MediaPipe Hands e OpenCV para processamento visual, além de FastAPI e WebSockets para comunicação entre dispositivos com baixa latência. A interface apresenta pads musicais interativos sobrepostos à imagem da câmera, permitindo reproduzir sons de bateria por meio de gestos, sem necessidade de instrumentos físicos ou controles tradicionais. O Air Drums explora conceitos de interação humano-computador, processamento de imagens, reconhecimento de gestos e experiências digitais imersivas, aproximando programação, criatividade e expressão musical.',
    tools: [
      'Python',
      'MediaPipe Hands',
      'OpenCV',
      'FastAPI',
      'WebSockets',
      'JavaScript',
      'HTML',
      'CSS',
      'Computer Vision',
      'Audio Processing'
    ],
    gallery: [],
  },
];
