# Leonardo Carvalho — portfólio

Projeto completo em **Vite + React + TypeScript**. Visual editorial em preto, papel cru e vermelho. As capas são estudos gráficos originais deste portfólio; os espaços de projetos estão identificados como “em breve”.

## Rodar no computador

Instale o **Node.js 22.12 ou superior**. Na pasta do projeto:

```bash
npm i
npm run dev
```

Abra o endereço exibido pelo Vite, normalmente `http://localhost:5173`.

No Windows, pode executar esses comandos no terminal do VS Code, PowerShell ou CMD. Não é necessário Python, XAMPP, banco de dados, API key ou arquivo `.env`.

## Build e verificações

```bash
npm run typecheck
npm test
npm run build
npm run preview
```

O build fica em `dist/`. Para instalar exatamente as versões do lockfile, use `npm ci` no lugar de `npm i`.

As páginas usam `HashRouter`: `/#/`, `/#/contato` e `/#/trabalho/forma-e-identidade`. Isso permite abrir e atualizar rotas em hospedagem estática sem configurar regras de redirecionamento.

## Onde editar

| Arquivo | Conteúdo |
| --- | --- |
| `src/data/site.ts` | Nome, biografia, redes sociais e modelo 3D opcional. |
| `src/data/projects.ts` | Projetos, imagens, descrição, ferramentas e links. |
| `src/styles.css` | Paleta, tipografia, grid e versões responsivas. |
| `src/components/Hero.tsx` | Abertura e escultura interativa. |
| `src/components/About.tsx` | Apresentação pessoal. |
| `src/components/Works.tsx` | Arquivo de trabalhos e scroll horizontal. |
| `src/components/Manifesto.tsx` | Texto de leitura progressiva. |
| `src/components/Contact.tsx` | Contato no rodapé. |
| `src/pages/ContactPage.tsx` | Formulário que prepara a mensagem. |
| `src/pages/Project.tsx` | Template das páginas de projeto. |
| `src/shaders/ripple.ts` | Vertex e fragment shaders GLSL. |
| `public/art/` | Capas, grain e imagem de compartilhamento. |
| `public/models/` | Pasta para seu `.glb`, se quiser substituir a geometria procedural. |

## Adicionar um trabalho real

1. Coloque as imagens em `public/projects/nome-do-projeto/`.
2. Edite um registro de `src/data/projects.ts` ou adicione outro.
3. Troque `kind` para `'published'`. O título da seção muda automaticamente para “Trabalhos” quando houver um projeto publicado.
4. Use um `slug` único, sem espaços ou acentos.

Exemplo completo de registro; substitua os dados e caminhos pelos arquivos do seu trabalho:

```ts
{
  slug: 'meu-projeto',
  number: '01',
  title: 'Nome do projeto',
  category: 'Desenvolvimento web',
  kind: 'published',
  year: '2026',
  cover: '/projects/meu-projeto/capa.webp',
  coverAlt: 'Descrição objetiva da imagem de capa.',
  summary: 'Uma frase sobre a ideia central.',
  description: 'O que você criou, por que criou e como chegou ao resultado.',
  tools: ['React', 'TypeScript', 'GSAP'],
  gallery: [
    { src: '/projects/meu-projeto/tela-01.webp', alt: 'Tela inicial do projeto.' },
    { src: '/projects/meu-projeto/tela-02.webp', alt: 'Detalhe de uma interação.' },
  ],
  liveUrl: 'https://seu-dominio.com',
  sourceUrl: 'https://github.com/seu-usuario/seu-repositorio',
}
```

`liveUrl` e `sourceUrl` são opcionais. Remova as propriedades se não houver destino. Os links são exibidos somente para URLs HTTP/HTTPS válidas. Não há links fictícios na configuração inicial.

## Contato

O site usa os perfis configurados em `src/data/site.ts`. O formulário valida os campos, prepara a mensagem e permite copiá-la antes de abrir o Instagram. Ele **não envia mensagens sozinho**, não armazena dados e não simula um backend.

Para oferecer também um botão de e-mail, preencha `email` em `src/data/site.ts`. Isso habilita um link `mailto:` com assunto e corpo; o envio continua acontecendo no aplicativo de e-mail do visitante. Não é necessário expor credenciais.

## Modelo 3D e Draco

Sem arquivos extras, a hero já mostra um torus knot procedural, com material físico, luzes locais e reflexos produzidos por `Lightformer`.

Para usar seu modelo:

1. Exporte um `.glb` centrado, próximo de 2 unidades de altura, com materiais PBR.
2. Coloque-o em `public/models/escultura.glb`.
3. Defina `modelUrl: '/models/escultura.glb'` em `src/data/site.ts`.
4. Ajuste a escala em `UserModel`, no arquivo `src/components/HeroScene.tsx`, se necessário.

O loader aceita modelos comprimidos com Draco. Os decoders estão incluídos em `public/draco/`, sem dependência de CDN. A geometria procedural não faz download de um modelo e não precisa de compressão Draco. Um GLB enviado depois deve ser comprimido na exportação; o site não altera o arquivo durante a execução.

## Motion e interação

| Interação | Implementação |
| --- | --- |
| Preloader com contador e saída recortada | `Preloader.tsx`, timeline GSAP. |
| Cursor contextual com lerp | `useCursor.ts`, labels VER, ARRASTE, GIRE e ABRIR. |
| Magnetismo e preenchimento | `Magnetic.tsx` e `styles.css`. |
| Texto por linhas/letras | `useScrollTL.ts`, SplitText com máscaras e redivisão responsiva. |
| Scroll suave sincronizado | `MotionProvider.tsx`, Lenis no ticker do GSAP. |
| Seção pinada e trilho horizontal | `Works.tsx`, ScrollTrigger com scrub. |
| Arraste do arquivo no desktop | `useHorizontalDrag.ts`, sincronizado à posição de scroll. |
| Parallax e reveal de imagem | `useScrollTL.ts`, `Works.tsx`. |
| 3D com mouse, scroll e clique | `HeroScene.tsx`, React Three Fiber + drei. |
| Ondulação GLSL nas capas | `DistortionCanvas.tsx` e `shaders/ripple.ts`. |
| Marquee ligado à velocidade do scroll | `Marquee.tsx`. |
| Wipe entre páginas | `RouteTransition.tsx`, Framer Motion. |
| Partículas ao clicar | `ClickEffects.tsx`. |

As curvas expressivas `editorial` e `settle` usam CustomEase. Mapeamentos diretamente ligados à posição do scroll usam `ease: 'none'` para não desalinhar o progresso; o amortecimento vem do `scrub`.

## Mobile, acessibilidade e desempenho

- `prefers-reduced-motion` desliga scroll suave, movimento automático, shaders de hover, pinning, partículas e cursor customizado.
- O botão “Motion on/off” permite pausar os efeitos durante a visita.
- Abaixo de 900px, os trabalhos viram um grid vertical. Em celulares, ficam em uma coluna.
- O 3D reduz segmentos de geometria, resolução dos reflexos e DPR em telas menores. A escultura pode ser girada por toque.
- O DPR é limitado a 1.6 no desktop, 1.2 no mobile e 1.25 no shader de imagens.
- A escultura pausa a renderização contínua fora da tela. Com movimento reduzido, usa renderização sob demanda.
- Os módulos 3D são importados com `React.lazy`; os shaders de imagens só são solicitados após interação e são desmontados fora da região visível.
- As imagens estáticas continuam disponíveis sem WebGL. A escultura tem uma alternativa vetorial.
- Timers, observers, event listeners, tickers e ScrollTriggers são limpos ao desmontar componentes.
- Fontes são servidas pelo próprio build através de `@fontsource`; não há requisições ao Google Fonts.
- Menu móvel com Escape e navegação por Tab, link para pular ao conteúdo, labels, foco visível e texto alternativo nas capas.

## Publicar em outra hospedagem

Execute `npm run build` e publique o conteúdo de `dist/` na raiz do seu domínio. Atualize `og:image` em `index.html` com a URL absoluta da imagem no domínio novo. A imagem é `public/art/social.png`.

Os assets e fontes são locais. Uma instalação do Node com npm e acesso ao registry é necessária apenas para instalar dependências e construir o projeto. O site pronto é estático.

## Validação desta entrega

- TypeScript e build de produção verificados.
- Testes automatizados de formulário, cópia de mensagem, fallback da área de transferência, URLs e referências de capas.
- Revisão visual em navegador não executada: o controle de navegador exigido pelo ambiente não estava disponível. Os efeitos WebGL e o layout devem ser conferidos no navegador de destino.

## Referências das bibliotecas

- [GSAP SplitText](https://gsap.com/docs/v3/Plugins/SplitText/)
- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [Lenis](https://github.com/darkroomengineering/lenis)
- [React Three Fiber](https://r3f.docs.pmnd.rs/)
- [drei](https://drei.docs.pmnd.rs/)
- [Motion para React](https://motion.dev/docs/react)

Os decoders Draco seguem Apache 2.0. As demais dependências mantêm suas próprias licenças, disponíveis nos respectivos pacotes.
