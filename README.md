# Taskify — Gerenciamento de tarefas

Aplicação Node.js com módulos de saúde da API e usuários; testes automatizados com Vitest.

## Estrutura

- `src/`: código-fonte, módulos, rotas, views e arquivos públicos
- `test/`: configuração auxiliar dos testes
- `package.json` e `package-lock.json`: dependências e scripts
- `vitest.config.js`: configuração do Vitest
- `.github/workflows/ci.yml`: verificação automatizada por Pull Request
- `.github/workflows/ambientes.yml`: passagem de staging para production, sem implantação real
- `docs/PGCS_Taskify_DevOps.md`: conteúdo textual integral do Plano de GCS v1.0 (19 páginas)
- `docs/ADENDO_GCS.md`: adequações à atividade acadêmica
- `docs/EVIDENCIAS_GCS.md`: registros de verificação

O PDF original do PGCS foi fornecido no material da atividade; esta cópia textual versionada permite a verificação no próprio GitHub.

## Testes

```bash
npm ci
npm run test:run
```

## Gerenciamento de Configuração

Alterações em `main` devem seguir branch de trabalho, Pull Request, aprovação de colega com escrita e CI. A configuração de proteção exige uma regra no GitHub e **não é criada pelo arquivo de workflow**.

Ambientes do GitHub Actions: `staging` e `production`, com aprovação obrigatória de `bruno-travessini` no ambiente `production`. Os workflows de demonstração não implantam servidores de verdade.

**Status da atividade:** veja `docs/EVIDENCIAS_GCS.md`; não considere configurações concluídas sem validação real.
