# Quality Gate

Nenhum código vai para produção sem validação automática e revisão de impacto.

Fluxo obrigatório:

`código → nvm use → npm run verify → PR → CI Quality Gate → revisão → merge em main → produção`

Este projeto é **JavaScript** (Next.js 12, Pages Router). Não há TypeScript; o gate de tipagem não se aplica. A análise estática é o ESLint (`next lint`).

## Ambiente

- **Node 22** (`.nvmrc`, `engines.node`). Vercel não aceita mais Node 18; 20/22/24 funcionam com este Next 12. Local e CI usam 22.
- **npm** é o gerenciador oficial (`package-lock.json`, `packageManager` no `package.json`). Não use Yarn.

```bash
nvm use
npm ci
npm run verify
```

## Nova feature

1. Trabalhe em uma branch a partir de `main`.
2. Altere o menor conjunto possível de arquivos.
3. Se a mudança toca CMS, formulário, layout compartilhado ou `next/image`, acrescente ou atualize teste de comportamento em `tests/unit` e, se o fluxo for visível ao usuário, em `e2e/`.
4. Rode `npm run verify` antes de abrir o PR.
5. Preencha o checklist do template de Pull Request.

## Validações locais (`npm run verify`)

Falha na primeira etapa com erro:

1. `npm run lint` — ESLint (`next/core-web-vitals`), ignorando SVGs gerados em `components/images`.
2. `npm run test` — Jest + Testing Library (CMS, hosts de imagem, Header, Fale Conosco, CTA).
3. `npm run build` — `next build` (precisa das env vars do Hygraph).
4. `npm run test:e2e` — smoke HTTP da home na porta **3010** (título, seções, formulário, CTA, imagens Hygraph).

Atalhos:

```bash
npm run lint
npm run test
npm run build
npm run test:e2e
npm run test:e2e:browser
```

`test:e2e:browser` (Playwright desktop/mobile) roda no **CI** contra `next start` na porta **3001**, separada do smoke. Localmente o Chromium do Playwright precisa de libs do sistema (`npx playwright install-deps`); neste WSL isso exige sudo.

Instalação usa `.npmrc` com `legacy-peer-deps=true` (peer antigo de `html-react-parser`) e `engine-strict=true`.

## CI e proteção da main

O workflow `.github/workflows/quality-gate.yml` roda em todo PR e em push para `main`:

`lint → test → build → smoke HTTP → Playwright contra next start` (Node 22)

O check se chama **Quality Gate**. A branch `main` exige esse check (`strict`: o branch precisa estar atualizado com `main`).

Secrets do repositório (já configurados; usados no build):

- `NEXT_PUBLIC_GRAPHCMS_ENDPOINT`
- `NEXT_PUBLIC_GRAPHCMS_MEDIA_ENDPOINT`
- `GRAPHCMS_TOKEN`

Sem esses secrets o `getStaticProps` da home quebra no CI.

## Quando criar teste novo

Crie ou estenda teste **unitário** quando a mudança alterar:

- `lib/cms.js` / query da home
- `next.config.js` (hosts de imagem)
- Header, Footer, FloatingButton
- Fale Conosco / EmailJS
- um componente compartilhado em `components/common` ou `components/layout`

Crie ou estenda **E2E** quando a mudança alterar um fluxo visível:

- home carregar seções CMS
- formulário de contato
- CTA WhatsApp
- imagens Empresa/Produtos
- navegação desktop/mobile

Não crie teste só para subir cobertura.

## Alterações visuais

Além do `verify`: conferir desktop e mobile, overflow, imagens quebradas e o formulário em estado de erro. Não há Storybook. No CI o Playwright cobre viewport desktop (1280) e mobile (390).

## Se um teste falhar

1. Leia a mensagem da etapa que quebrou (`lint`, `test`, `build` ou `test:e2e`).
2. Corrija a causa; não desabilite a regra/teste sem registrar o motivo no PR.
3. Rode de novo `npm run verify`.
4. Só então peça review.

## PR pronto para produção

- `nvm use` (Node 22)
- `npm run verify` verde localmente
- CI **Quality Gate** verde
- checklist do PR preenchido
- impacto em componentes compartilhados revisado
