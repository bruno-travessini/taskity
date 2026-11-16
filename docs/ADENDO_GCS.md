# Adendo ao Plano de Gerenciamento de Configuração — Taskify

Este adendo complementa o plano **versão 1.0, de 21/09/2026**, com as exigências da atividade acadêmica. O original descrevia uma branch `master`; atualmente o GitHub usa `main`.

## Plano como item de configuração

O PGCS foi publicado como `docs/PGCS_Taskify_DevOps.md`, mantendo o texto das 19 páginas do documento original. O documento e este adendo são itens sob versionamento Git.

## Controle de mudanças

A política solicitada para `main` é:
- envio por branch e Pull Request, não por push direto
- no mínimo 1 aprovação **de outro colaborador** com acesso de escrita
- impedir exclusão e force push
- sem exceção de bypass para o proprietário, para que seu próprio push seja recusado
- opcionalmente requerer o check de CI depois de sua primeira execução

**Atenção:** regras de proteção têm que ser efetivamente configuradas em Settings → Rules/Branches; um workflow sozinho não bloqueia push direto.

## CI e environments

- `.github/workflows/ci.yml`: instalação, sintaxe, testes Vitest e auditoria de dependências no GitHub Actions
- `.github/workflows/ambientes.yml`: homologação em `staging` e job de `production` com aprovação configurada no GitHub
- `production` exige `bruno-travessini` como Required reviewer
- se o próprio responsável iniciar uma execução, `Prevent self-review` deve ficar desligado para que possa aprová-la

Os jobs demonstram o fluxo, **sem implantação real de infraestrutura**.

## Auditoria

Registrar em `docs/EVIDENCIAS_GCS.md`: URL pública, plano publicado, regra ativa, erro real de push direto, colaborador com acesso de escrita e ambientes configurados. Prints não devem ser simulados.
