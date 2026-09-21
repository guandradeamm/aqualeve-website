## Resumo
<!-- O que mudou e por quê. -->

## Tipo de alteração
- [ ] Correção
- [ ] Feature
- [ ] Layout / responsividade
- [ ] Conteúdo / CMS
- [ ] Quality Gate / tooling

## Checklist

### Validação técnica
- [ ] `npm run lint` executado
- [ ] `npm run test` executado
- [ ] `npm run build` executado
- [ ] `npm run test:e2e` executado
- [ ] `npm run test:e2e:browser` executado no CI (Playwright)
- [ ] `npm run verify` passou localmente (Node 18, `nvm use`)
- [ ] CI **Quality Gate** passou

### Regressão
- [ ] Analisei o impacto da alteração
- [ ] Verifiquei componentes compartilhados (`components/common`, `layout`, barrel `components/index.js`)
- [ ] Verifiquei fluxos relacionados (home CMS, Empresa, Produtos, Fale Conosco, CTA WhatsApp)
- [ ] Testei as funcionalidades afetadas em desktop e mobile, quando a UI mudou
- [ ] Não identifiquei regressões

### Interface (se o PR altera UI)
- [ ] Desktop validado
- [ ] Mobile validado
- [ ] Overflow / quebra de layout conferidos
- [ ] Imagens da Empresa/Produtos visíveis
- [ ] Estado de erro do formulário conferido, se o form mudou

### API / CMS (se o PR altera dados)
- [ ] Query GraphQL ainda pede os campos usados na home
- [ ] Ausência de `socials`/imagens não quebra Header, CTA ou Footer
- [ ] Env vars de Hygraph conferidas (`.env.example` / secrets do CI)

### Código
- [ ] Não deixei código morto
- [ ] Não deixei `console.log` / debug
- [ ] Não criei duplicação desnecessária
- [ ] Mantive o padrão atual (Pages Router, componentes em `components/`)

### Produção
- [ ] Build de produção validado
- [ ] Variáveis de ambiente verificadas
- [ ] PR está pronto para revisão
