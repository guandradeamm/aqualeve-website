# Campanhas temáticas

## Ligar / desligar

| Valor `NEXT_PUBLIC_CAMPAIGN` | Efeito |
|---|---|
| `none` / `off` / `false` | Marca original |
| `outubro-rosa` | Força Outubro Rosa |
| `auto` (padrão) | Ativa pela data (`schedule.months`) |

Legado ainda aceito: `NEXT_PUBLIC_OUTUBRO_ROSA=true\|false\|auto`.

## Adicionar campanha

1. Crie `lib/campaigns/definitions/<id>.js` (copie `outubro-rosa.js`).
2. Exporte e registre em `lib/campaigns/registry.js`.
3. Adicione `html.campaign-<id> { ... }` em `styles/tailwind.scss`.
4. (Opcional) force local: `NEXT_PUBLIC_CAMPAIGN=<id>` no `.env.local`.

Componentes usam tokens `bg-campaign-header`, `bg-campaign-cta`, `text-campaign-heading`, etc. — **não** coloquem `if (campanha === ...)`.

Conteúdo do Hero vem de `campaign.hero` via `useCampaign()`.

## Voltar ao visual original

```bash
# .env.local ou Vercel
NEXT_PUBLIC_CAMPAIGN=none
```

Ou remova a flag e use `auto` fora do mês da campanha.
