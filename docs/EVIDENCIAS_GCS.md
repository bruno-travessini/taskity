# Evidências da atividade — Taskify

Repositório: https://github.com/bruno-travessini/taskity

| Critério | Situação | Comprovação |
| --- | --- | --- |
| 1. Estrutura organizada e plano publicado | Concluído na main | [Plano de GCS](PGCS_Taskify_DevOps.md) e README |
| 2. Repositório acessível | Público, verificado em 16/11/2026 | https://github.com/bruno-travessini/taskity |
| 3. Recusa de alteração direta na main | Bloqueio real por HTTP 409 da API autenticada, em 16/11/2026 | [Registro detalhado da recusa](EVIDENCIA_RECUSA_MAIN.md) |
| 4. Par revisor com acesso de escrita | `FelipeAnjos20`, permissão `write` confirmada pelo GitHub em 16/11/2026 | Settings → Collaborators |
| 5. staging e production, proprietário como revisor obrigatório | Usuário exibiu telas de ambos ambientes; production com 1 regra de proteção e `bruno-travessini` selecionado | Settings → Environments → production |

## Observações importantes

- A evidência do item 3 registra a **recusa da API GitHub**, não o comando `git push` executado em um terminal; se o professor pedir especificamente o log de push direto, esse teste local continua necessário.
- O [Pull Request #1](https://github.com/bruno-travessini/taskity/pull/1) foi integrado antes da proteção e não comprova uma revisão realizada por `FelipeAnjos20`.
- O workflow de ambientes do GitHub Actions demonstra a sequência staging → production, mas não realiza implantação externa de uma aplicação.
- Capturas de tela e configurações administrativas não devem ser simuladas.
