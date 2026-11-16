# Evidência real de bloqueio de alteração direta na `main`

**Projeto:** Taskify  
**Repositório:** https://github.com/bruno-travessini/taskity  
**Data da verificação:** 16/11/2026  
**Regra:** `Protecao da branch mainn` — ruleset GitHub ID `27416423`  
**Branch protegida:** `main`

## Tentativa realizada

Foi solicitada ao GitHub, pela API autenticada, a criação direta do arquivo `docs/teste-bloqueio-push-direto-2026.txt` na branch `main`, com a mensagem de commit `test(gcs): verifica recusa de alteracao direta na main`.

O GitHub **recusou** a alteração com a seguinte resposta (transcrição do erro real):

```text
CONFLICT: Error code: CONFLICT; Error: GitHub API error 409:
{
  "message": "Repository rule violations found\n\nChanges must be made through a pull request.\n\n",
  "metadata": {},
  "documentation_url": "https://docs.github.com/rest/repos/contents#create-or-update-file-contents",
  "status": "409"
}
```

**Resultado:** alteração bloqueada; o arquivo de teste não foi incorporado à `main`.

## Verificação da regra

Na consulta às configurações do ruleset, o GitHub retornou:

- `enforcement: active`
- Alvo: branch padrão (`~DEFAULT_BRANCH`), correspondente a `main`
- `pull_request` com `required_approving_review_count: 1`
- `deletion` e `non_fast_forward` bloqueados
- `bypass_actors: []`
- `current_user_can_bypass: never`

Regra: https://github.com/bruno-travessini/taskity/rules/27416423

## Limite da evidência

Esta é a evidência **real de recusa de escrita direta pela API autenticada do GitHub**. Não é uma captura de terminal executando `git push`. Se a avaliação exigir especificamente um print da recusa do comando `git push origin HEAD:main`, será preciso realizar e registrar esse teste em um clone Git local.

O commit `fc06f95a114a8713752f6759003c4c09d44b3083` e o PR #1 comprovam uma integração anterior, mas não a recusa de push.
