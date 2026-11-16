# Plano de Gerenciamento de Configuração de Software — TASKIFY

> Transcrição integral de conteúdo textual do documento original **PGCS_Taskify_DevOps.pdf** (versão 1.0, 21/09/2026, 19 páginas). As páginas são preservadas como texto pré-formatado para manter as tabelas. O plano original foi elaborado antes das configurações de novembro de 2026; consulte o [adendo da atividade](ADENDO_GCS.md) para o estado desejado e as evidências verificadas. O PDF original está incluído no pacote ZIP entregue separadamente.

## Página 1

```text
TASKIFY — PGCS DevOps


                  TASKIFY — Plataforma de Gerenciamento de Tarefas
           PLANO DE GERENCIAMENTO DE CONFIGURAÇÃO
                      Enfoque DevOps — Integração e Entrega Contínuas (CI/CD)

                                                    Versão 1.0


 Campo                                Descrição

 Projeto                              TASKIFY — Plataforma de Gerenciamento de Tarefas

 Gerente de Projeto                   Bruno Travessini

 Gerente/Responsável de GCS-
                                      Bruno Travessini
 DevOps

                                      Desenvolvedor individual (projeto acadêmico de testes de software —
 Fábrica de Software / Squad
                                      "Taskify")

 Repositório principal                https://github.com/bruno-travessini/taskity (branch principal: master)



Histórico de Revisões

 Data                 Versão   Descrição                                                     Autor

                               Elaboração do PGC com enfoque em práticas DevOps
 21/09/2026           1.0      (CI/CD), a partir da análise do repositório real do projeto   Bruno Travessini
                               Taskify.
```

## Página 2

```text
TASKIFY — PGCS DevOps


Sumário
1. Introdução.................................................................................................................................. 3
     1.1 Finalidade....................................................................................................................................................3
     1.2 Escopo.........................................................................................................................................................3
     1.3 Definições, Acrônimos e Abreviações.........................................................................................................3
     1.4 Referências..................................................................................................................................................4
     1.5 Visão Geral..................................................................................................................................................4
2. Cultura DevOps e Papéis na Gerência de Configuração................................................................5
3. Ferramentas, Ambientes e Infraestrutura...................................................................................6
     3.1 Ferramentas do Pipeline.............................................................................................................................6
     3.2 Ambientes e Infraestrutura.........................................................................................................................6
     3.3 Estratégia de Branching e Versionamento..................................................................................................7
4. Identificação da Configuração.....................................................................................................8
     4.1 Itens de Configuração.................................................................................................................................8
     4.2 Convenção de Nomenclatura......................................................................................................................8
     4.3 Estrutura do Repositório.............................................................................................................................8
5. Integração Contínua (CI)...........................................................................................................10
     5.1 Etapas do Pipeline de CI............................................................................................................................10
     5.2 Política de Pull Request e Revisão de Código...........................................................................................10
     5.3 Critérios de Qualidade (Quality Gate).......................................................................................................10
6. Entrega e Implantação Contínua (CD)........................................................................................ 11
     6.1 Etapas do Pipeline de CD..........................................................................................................................11
     6.2 Estratégias de Implantação.......................................................................................................................11
     6.3 Rollback e Recuperação............................................................................................................................11
7. Infraestrutura como Código (IaC).............................................................................................. 12
     7.1 Versionamento de Infraestrutura.............................................................................................................12
     7.2 Ambientes Efêmeros.................................................................................................................................12
8. Controle de Configuração e Mudança........................................................................................ 13
     8.1 Processo de Solicitação de Mudança........................................................................................................13
     8.2 Comitê de Controle de Mudança (CCM)...................................................................................................13
9. Baselines e Releases................................................................................................................. 14
     9.1 Geração Automática de Baseline..............................................................................................................14
     9.2 Notas de Versão (Release Notes)..............................................................................................................14
10. Estimativa do Status de Configuração......................................................................................15
     10.1 Monitoramento e Observabilidade.........................................................................................................15
     10.2 Métricas DORA........................................................................................................................................15
     10.3 Relatórios e Auditorias............................................................................................................................15
11. Marcos.................................................................................................................................... 16
12. Treinamento e Recursos..........................................................................................................17
13. Controle de Software de Subcontratados, Fornecedores e Dependências................................18
14. Quadro-Resumo do Pipeline CI/CD.......................................................................................... 19
```

## Página 3

```text
TASKIFY — PGCS DevOps


1. Introdução
Este Plano de Gerenciamento de Configuração (PGC) descreve as atividades de Gestão de Configuração de
Software (GCS) que serão executadas ao longo do ciclo de vida do Taskify, plataforma de gerenciamento de
tarefas desenvolvida em Node.js, com ênfase em práticas DevOps — em particular Integração Contínua
(CI), Entrega/Implantação Contínua (CD), Infraestrutura como Código (IaC) e automação de pipelines. As
atividades envolvem identificar os itens de configuração do repositório, manter sua integridade e controlar
sistematicamente as mudanças, com o mínimo de burocracia possível e o máximo de automação.
Nota de elaboração: o repositório analisado (https://github.com/bruno-travessini/taskity) encontra-se em estágio
inicial (1 commit, branch única "master", sem pipelines de CI/CD configurados). Este plano documenta o estado atual
do projeto e define o padrão de GCS/DevOps a ser adotado à medida que o projeto evolui.

1.1 Finalidade
Estabelecer um padrão a ser seguido pelo desenvolvedor responsável pelo Taskify, garantindo
rastreabilidade, versionamento e controle de mudanças do produto, apoiado por pipelines automatizados
de build, teste, integração e implantação, à medida que o projeto amadurece.

1.2 Escopo
Este PGC é destinado ao indivíduo Bruno Travessini, responsável pelo desenvolvimento e operação do
sistema Taskify — aplicação de gerenciamento de tarefas construída em Node.js (módulo http nativo, sem
framework), com módulos de saúde da API (health) e de usuários (cadastro e login), testada com o
framework Vitest. O plano cobre o código-fonte, a suíte de testes automatizados, os arquivos de
configuração de build/execução e, prospectivamente, os pipelines de CI/CD, containerização e
infraestrutura a serem incorporados ao projeto.

1.3 Definições, Acrônimos e Abreviações
 Termo                          Significado

 GCS                            Gestão de Configuração de Software

 CI                             Integração Contínua (Continuous Integration)

 CD                             Entrega/Implantação Contínua (Continuous Delivery / Deployment)

 IaC                            Infraestrutura como Código (Infrastructure as Code)

 CCM                            Comitê de Controle de Mudanças

                                Conjunto de itens de configuração que atingiram um estado comprovado de
 Baseline
                                estabilidade

 Pipeline                       Sequência automatizada de etapas de build, teste, análise e implantação

                                Estratégia de branching em que os desenvolvedores integram na branch principal
 Trunk-based Development
                                com alta frequência

 SemVer                         Versionamento Semântico (MAJOR.MINOR.PATCH) — ex.: 1.0.0

                                Métricas de desempenho DevOps (Lead Time, Deployment Frequency, MTTR,
 DORA Metrics
                                Change Failure Rate)

                                ECMAScript Modules — formato de módulos usado no projeto ("type": "module"
 ESM
                                no package.json)

 Vitest                         Framework de testes unitários utilizado no projeto (compatível com Vite/ESM)
```

## Página 4

```text
TASKIFY — PGCS DevOps


1.4 Referências
   •   Documento base: Processos de Desenvolvimento de Software e a Integração com GCS.
   •   Template do Plano de Gerenciamento de Configuração (RUP 7.0, IBM) — adaptado.
https://github.com/bruno-travessini/taskity
    • package.json / package-lock.json do projeto (dependências e scripts de execução).
   •   Configuração de testes: vitest.config.js e test/setup.js.

1.5 Visão Geral
Diferente de processos tradicionais em que a GCS é predominantemente manual e concentrada em marcos
formais, neste plano a GCS é tratada como parte constante do pipeline de entrega: cada commit integrado,
testado e implantado automaticamente gera evidências de rastreabilidade (logs de pipeline, tags de versão,
artefatos publicados), reduzindo o esforço manual e o tempo entre a mudança e sua entrega em produção.
No estágio atual do Taskify, a rastreabilidade é garantida pelo controle de versão Git; a automação de
CI/CD, descrita nas seções 5 e 6, é a próxima etapa de maturidade a ser implementada.
```

## Página 5

```text
TASKIFY — PGCS DevOps


2. Cultura DevOps e Papéis na Gerência de Configuração
A GCS em um contexto DevOps é responsabilidade compartilhada entre desenvolvimento e operações
("Você constrói, você executa" — you build it, you run it), apoiada por automação. Como o Taskify é
atualmente desenvolvido por um único integrante, todos os papéis abaixo são exercidos pela mesma
pessoa (Bruno Travessini); a tabela documenta as responsabilidades típicas para orientar uma eventual
expansão da equipe.

 Papel                          Responsabilidades                                          Responsável Atual

 Gerente de Projeto / Product   Prioriza o backlog, autoriza mudanças de maior impacto e
                                                                                           Bruno Travessini
 Owner                          acompanha indicadores de entrega (DORA Metrics).

                                Projeta e mantém os pipelines de CI/CD, define a
 Engenheiro DevOps / Release
                                estratégia de branching e versionamento, administra o      Bruno Travessini
 Engineer
                                registro de artefatos/imagens e a IaC.

                                Integra código com frequência na branch principal,
                                escreve testes automatizados (Vitest), revisa Pull
 Desenvolvedor(a)                                                                          Bruno Travessini
                                Requests e é corresponsável pela qualidade do que é
                                implantado.

                                Monitora o ambiente (endpoint /api/health), define
 SRE / Operações                SLIs/SLOs, participa de postmortems e realiza rollback     Bruno Travessini
                                quando necessário.

                                Mantém a suíte de testes automatizados (unitários dos
 QA / Automação de Testes       módulos health e user) executada localmente e,             Bruno Travessini
                                futuramente, nos pipelines de CI.

                                Define políticas de análise de dependências (SCA) e
 Segurança (DevSecOps)          gestão de segredos (.env, fora do controle de versão)      Bruno Travessini
                                integradas ao pipeline.

                                Atua apenas em mudanças de alto risco/impacto; no
 Comitê de Controle de          estágio atual (projeto individual), não é formalmente      N/A (projeto
 Mudanças (CCM)                 constituído — decisões de mudança relevante são            individual)
                                registradas via commit/PR.
```

## Página 6

```text
TASKIFY — PGCS DevOps


3. Ferramentas, Ambientes e Infraestrutura
3.1 Ferramentas do Pipeline
A tabela abaixo indica, para cada categoria, o que já está efetivamente em uso no repositório e a
ferramenta recomendada para as lacunas identificadas.

                                                                                                  Status no
 Categoria                Ferramenta(s)
                                                                                                  projeto

                          Git + GitHub (repositório
 Controle de versão                                                                               Em uso
                          https://github.com/bruno-travessini/taskity, branch única "master")

                          Node.js (ESM — "type": "module"), módulo http nativo (sem
 Runtime / Linguagem                                                                              Em uso
                          framework), gerenciador npm

                          Vitest (scripts "test" e "test:run" no package.json), ambiente de
 Testes automatizados                                                                             Em uso
                          testes configurado em vitest.config.js e test/setup.js

 Execução em              nodemon (recarregamento automático do servidor) e dotenv
                                                                                                  Em uso
 desenvolvimento          (variáveis de ambiente via .env, ignorado pelo Git)

                          GitHub Actions (recomendado — ainda não há diretório
 Orquestração de CI/CD                                                                            A implementar
                          .github/workflows no repositório)

 Empacotamento            Docker (recomendado — ainda não há Dockerfile no repositório)           A implementar

                          GitHub Container Registry (recomendado, alinhado ao GitHub já
 Registro de artefatos                                                                            A implementar
                          utilizado)

 Infraestrutura como      N/A no momento — projeto roda localmente; recomenda-se
                                                                                                  A avaliar
 Código                   Terraform ao migrar para nuvem

 Orquestração de          N/A no momento; recomenda-se avaliação futura (ex.: Docker
                                                                                                  A avaliar
 containers               Compose para múltiplos serviços)

                          dotenv (.env local, listado em .gitignore); recomenda-se cofre de
 Gestão de segredos                                                                               Parcial
                          segredos (ex.: GitHub Actions Secrets) ao automatizar o deploy

 Monitoramento e          Endpoint próprio GET /api/health (status, timestamp, versão); sem
                                                                                                  Parcial
 Observabilidade          ferramenta externa de métricas/logs ainda

 Gestão de dependências   npm com lockfile (package-lock.json); recomenda-se Dependabot
                                                                                                  Parcial
 / SCA                    (nativo do GitHub) para varredura de vulnerabilidades

 Rastreamento de
                          GitHub Issues (recomendado — a ativar conforme o backlog cresça)        A implementar
 tarefas


3.2 Ambientes e Infraestrutura
Atualmente o Taskify possui apenas um ambiente local de desenvolvimento, executado via "npm run dev"
(porta definida pela variável de ambiente PORT, padrão 3000). Os ambientes de Homologação e Produção
ainda não foram provisionados. A tabela a seguir descreve o modelo-alvo de ambientes recomendado para
as próximas etapas do projeto.

                                                                                    Situação / Gatilho de
 Ambiente                 Finalidade
                                                                                    promoção

                          Execução local do servidor HTTP Node.js durante o
                                                                                    Já existente — execução local
 Desenvolvimento          desenvolvimento; recarregado automaticamente via
                                                                                    ("npm run dev")
                          nodemon.
```

## Página 7

```text
TASKIFY — PGCS DevOps


                                                                                   Situação / Gatilho de
 Ambiente                  Finalidade
                                                                                   promoção

                           Ambiente-alvo para testes de aceitação e validação      A implementar (deploy
 Homologação / Staging
                           funcional antes da produção, a ser provisionado.        automático após CI aprovado)

                           Ambiente-alvo para uso final da aplicação Taskify, a    A implementar (aprovação de
 Produção
                           ser provisionado.                                       gate de release)
Detalhamento de DNS, IPs, credenciais de acesso e topologia por ambiente deverá ser incluído nesta seção assim que
os ambientes de Homologação e Produção forem efetivamente provisionados.

3.3 Estratégia de Branching e Versionamento
O repositório encontra-se hoje com uma única branch (master) e um único commit. Recomenda-se a
adoção de Trunk-Based Development (ou GitHub Flow), com branches de vida curta, para viabilizar
integração contínua real assim que novas contribuições/funcionalidades forem desenvolvidas:
    •   main/trunk (atualmente "master") — deve se tornar sempre implantável (deployable); recomenda-
        se protegê-la com regra de PR obrigatório e pipeline verde assim que o CI for implementado.
    •   feature/<descrição-curta> — branches de curta duração (idealmente < 1-2 dias) para cada nova
        mudança (ex.: feature/task-crud, feature/auth-jwt).
    •   release/x.y (opcional) — a ser utilizada apenas se houver necessidade de estabilizar uma versão
        antes do deploy.
    •   hotfix/<descrição> — correções emergenciais aplicadas diretamente sobre produção e retro-
        integradas ao trunk.
Versionamento: adoção de Versionamento Semântico (MAJOR.MINOR.PATCH) — o package.json já declara
a versão 1.0.0 — e de Conventional Commits (feat, fix, chore, docs, refactor, test...), permitindo geração
automática de changelog e da próxima versão pelo pipeline quando este for implementado.
```

## Página 8

```text
TASKIFY — PGCS DevOps


4. Identificação da Configuração
4.1 Itens de Configuração
Além do código-fonte, os seguintes artefatos são itens de configuração formais do Taskify, versionados no
repositório Git:
    •   Código-fonte da aplicação (src/server.js, src/router.js e módulos de domínio em src/modules/)
    •   Código-fonte dos testes automatizados (src/modules/*/__tests__/*.test.js e test/setup.js)
    •   Arquivos estáticos de interface (src/views/index.html, src/public/stylesheets/style.css)
    •   Manifesto e lockfile de dependências (package.json e package-lock.json)
    •   Configuração do runner de testes (vitest.config.js)
    •   Configuração de ambiente de desenvolvimento (.vscode/launch.json)
    •   Arquivo de exclusão de versionamento (.gitignore — exclui node_modules/, .env e coverage/)
    •   Definições de pipeline como código (ex.: .github/workflows) — a serem criadas quando o CI/CD for
        implementado
    •   Dockerfiles e manifests de containers — a serem criados quando a containerização for adotada
    •   Scripts de Infraestrutura como Código — não aplicável no estágio atual (aplicação sem
        infraestrutura provisionada)
    •   Documentação técnica (README, ADRs) — a serem elaborados/expandidos

4.2 Convenção de Nomenclatura
 Item                     Convenção                                  Exemplo

 Branch de feature        feature/<ticket>-<descrição-curta>         feature/TASK-12-crud-tarefas

                          Conventional Commits: <tipo>(<escopo>):
 Commit                                                              feat(user): adiciona endpoint de login
                          <descrição>

 Tag de release           Versionamento Semântico vX.Y.Z             v1.0.0

 Imagem de container      <registro>/<projeto>:<versão|sha>          ghcr.io/bruno-travessini/taskity:1.0.0

 Módulo de domínio        src/modules/<nome-do-módulo>/              src/modules/user/, src/modules/health/


4.3 Estrutura do Repositório
Estrutura de diretórios atual do repositório (raiz: https://github.com/bruno-travessini/taskity, branch
master):
taskity/
├── src/
│   ├── modules/
│   │    ├── health/
│   │    │   ├── health.service.js
│   │    │   └── __tests__/health.service.test.js
│   │    └── user/
│   │        ├── user.service.js
│   │        └── __tests__/user.service.test.js
│   ├── public/stylesheets/style.css
│   ├── views/index.html
│   ├── router.js
│   └── server.js
├── test/setup.js
├── .vscode/launch.json
├── .gitignore
├── package.json / package-lock.json
└── vitest.config.js
```

## Página 9

```text
TASKIFY — PGCS DevOps


Cada módulo de domínio (health, user) segue o padrão <módulo>/<módulo>.service.js com sua respectiva
pasta __tests__/, o que facilita a identificação de itens de configuração por funcionalidade e deve ser
mantido à medida que novos módulos (ex.: task, project) forem adicionados.
```

## Página 10

```text
TASKIFY — PGCS DevOps


5. Integração Contínua (CI)
O repositório ainda não possui um pipeline de CI configurado (não há diretório .github/workflows). Esta
seção define o padrão que deve ser implementado: todo Pull Request para a branch principal deve disparar
automaticamente um pipeline de CI, e nenhuma mudança deve ser integrada sem que o pipeline seja
concluído com sucesso.

5.1 Etapas do Pipeline de CI (a implementar)
   1. Checkout do código e instalação de dependências com "npm ci" (usando o package-lock.json já
      existente).
   2. Build/verificação da aplicação (validação de que o servidor Node.js inicia corretamente).
   3. Análise estática de código (lint) — atualmente não há ESLint configurado; recomenda-se sua
      adoção.
   4. Testes unitários com Vitest ("npm run test:run"), cobrindo os módulos health e user, com medição
      de cobertura mínima (usando vitest --coverage).
   5. Testes de integração das rotas expostas em src/router.js (GET /api/health, POST
      /api/users/register, POST /api/users/login).
   6. Análise de segurança de dependências (SCA) via "npm audit" ou Dependabot/Snyk sobre o
      package-lock.json.
   7. Empacotamento e publicação do artefato/imagem versionado no registro (após a adoção de
      Docker).

5.2 Política de Pull Request e Revisão de Código
   •   Todo PR exige, no mínimo, 1 aprovação de outro desenvolvedor/colega antes do merge ("quatro
       olhos"); em caráter transitório, enquanto o projeto for de autoria individual, a autorrevisão deve
       ser documentada na descrição do PR.
   •   PRs devem ser pequenos e de vida curta, para reduzir conflitos e facilitar revisão.
   •   Merge somente permitido com pipeline de CI verde (quality gate), assim que este for
       implementado.

5.3 Critérios de Qualidade (Quality Gate)
   •   Cobertura de testes automatizados ≥ 80% nos módulos de domínio (src/modules/**).
   •   Zero vulnerabilidades críticas/altas reportadas por "npm audit" no package-lock.json.
   •   Zero erros de lint bloqueante (após a adoção de ESLint).
   •   100% dos testes existentes (health.service.test.js e user.service.test.js) executando com sucesso.
```

## Página 11

```text
TASKIFY — PGCS DevOps


6. Entrega e Implantação Contínua (CD)
Assim como o CI, o pipeline de CD ainda não está implementado no projeto. Após a publicação do artefato
pelo pipeline de CI, o pipeline de CD será responsável por promover essa mesma versão, sem recompilação,
através dos ambientes até a produção.

6.1 Etapas do Pipeline de CD (a implementar)
    8. Deploy automático em ambiente de Homologação/Staging (a ser provisionado).
    9. Execução de testes automatizados de aceitação/E2E em staging, cobrindo os fluxos de cadastro e
       login de usuários.
    10. Gate de aprovação para produção (manual, dado o estágio atual do projeto; automatizável no
        futuro conforme a criticidade evoluir).
    11. Deploy em produção com estratégia definida (ver 6.2).
    12. Testes de fumaça (smoke tests) pós-deploy sobre o endpoint GET /api/health.
    13. Geração automática de baseline/tag de release e notas de versão (changelog) a partir dos
        Conventional Commits.

6.2 Estratégias de Implantação
 Estratégia              Descrição

 Rolling update          Substituição gradual das instâncias antigas pelas novas, minimizando
                         indisponibilidade. Recomendada como estratégia inicial dada a simplicidade da
                         aplicação (servidor HTTP stateless).

                         Duas versões (ambientes) coexistem; o tráfego é comutado de uma vez para a
 Blue-Green
                         nova versão, permitindo rollback imediato.

                         A nova versão recebe uma pequena fração do tráfego real, sendo ampliada
 Canary Release
                         gradualmente conforme a confiança.

                         Funcionalidades são implantadas desligadas e ativadas em produção de forma
 Feature Flags           independente do deploy, reduzindo o risco de releases (ex.: novos endpoints de
                         tarefas ainda em desenvolvimento).


6.3 Rollback e Recuperação
Toda implantação deve ser reversível. Quando o pipeline de CD for implementado, ele deverá manter a
versão anterior disponível (imagem no registro, tag Git) para permitir rollback automatizado em caso de
falha nos testes de fumaça ou no health check (GET /api/health) pós-deploy.
```

## Página 12

```text
TASKIFY — PGCS DevOps


7. Infraestrutura como Código (IaC)
No estágio atual, o Taskify não possui infraestrutura provisionada em nuvem — a aplicação roda como um
processo Node.js local. Esta seção define o padrão a ser seguido quando a infraestrutura de Homologação e
Produção for provisionada.

7.1 Versionamento de Infraestrutura
   •   Alterações de infraestrutura deverão seguir o mesmo processo de PR + revisão + pipeline ("plan"
       automático em PR, "apply" após aprovação).
   •   O estado da infraestrutura (state file), quando existir, deverá ser armazenado de forma centralizada
       e versionada, nunca em máquinas locais.

7.2 Ambientes Efêmeros
Sempre que viável, ambientes de revisão (review apps) deverão ser provisionados automaticamente por
Pull Request, para validação isolada do Taskify, e destruídos automaticamente após o merge ou
fechamento do PR. Esta prática é especialmente recomendada para validar mudanças nos módulos de
usuário sem afetar dados de outros ambientes.
```

## Página 13

```text
TASKIFY — PGCS DevOps


8. Controle de Configuração e Mudança
8.1 Processo de Solicitação de Mudança
Mudanças de rotina (funcionalidades, correções) devem seguir o fluxo padrão: abertura de item de
trabalho (GitHub Issues) → branch de feature → Pull Request → revisão → pipeline de CI → merge →
pipeline de CD. Esse fluxo, por si, já constitui o registro formal e rastreável da mudança. No momento,
como o repositório possui apenas o commit inicial, este fluxo ainda será implantado a partir da próxima
mudança relevante no código.

8.2 Comitê de Controle de Mudança (CCM)
O CCM é acionado apenas em mudanças de alto impacto ou risco elevado, como alterações estruturais de
infraestrutura, mudanças de esquema de dados em produção, ou exceções ao fluxo padrão (ex.: hotfix
emergencial). Em situações rotineiras, a aprovação por pares (revisão de PR) substitui o comitê formal.
Dado que o Taskify é hoje um projeto de autoria individual, o CCM formal não está constituído; decisões
equivalentes a mudanças de alto impacto (ex.: alteração do modelo de dados de usuários, troca do
mecanismo de hashing de senha) devem ser registradas explicitamente na descrição do commit/PR
correspondente até que uma equipe maior justifique a formalização do comitê.
```

## Página 14

```text
TASKIFY — PGCS DevOps


9. Baselines e Releases
9.1 Geração Automática de Baseline
Diferente de modelos tradicionais, em que a baseline é criada manualmente em marcos do projeto, neste
plano cada implantação bem-sucedida em produção deverá gerar automaticamente uma baseline: uma tag
de versão (SemVer) associada ao commit e à imagem publicada no registro. Atualmente, o package.json
declara a versão 1.0.0, porém nenhuma tag Git foi criada ainda no repositório — a criação da tag v1.0.0 é
recomendada assim que o estado atual for considerado uma primeira entrega estável.

9.2 Notas de Versão (Release Notes)
As notas de release devem ser geradas automaticamente pelo pipeline a partir dos Conventional Commits
desde a última tag, publicadas junto à release no repositório GitHub. Enquanto o pipeline não existir,
recomenda-se a manutenção manual de um arquivo CHANGELOG.md até a automação ser implementada.
```

## Página 15

```text
TASKIFY — PGCS DevOps


10. Estimativa do Status de Configuração
10.1 Monitoramento e Observabilidade
O Taskify já expõe um endpoint de verificação de saúde (GET /api/health), retornando status, mensagem,
timestamp e versão da aplicação — base inicial para monitoramento. Os ambientes de Homologação e
Produção, quando provisionados, devem ser monitorados continuamente (métricas, logs e alertas),
permitindo identificar rapidamente falhas decorrentes de uma implantação.

10.2 Métricas DORA
As métricas abaixo ainda não são coletadas formalmente, dado o estágio inicial do repositório (1 commit,
sem pipeline). Recomenda-se iniciar a coleta assim que o pipeline de CI/CD entrar em operação.

 Métrica                   Descrição                                          Status Atual

                           Frequência com que o código é implantado em        Não medida (nenhum
 Deployment Frequency
                           produção.                                          deploy realizado ainda)

                           Tempo entre o commit e a implantação em
 Lead Time for Changes                                                        Não medida
                           produção.

                           Percentual de implantações que resultam em falha
 Change Failure Rate                                                          Não medida
                           em produção.

 Mean Time to Restore      Tempo médio para restaurar o serviço após uma
                                                                              Não medida
 (MTTR)                    falha.


10.3 Relatórios e Auditorias
O histórico de commits do Git e, futuramente, os logs do pipeline de CI/CD (builds, testes, deploys)
constituirão o principal insumo de auditoria de GCS, dispensando relatórios manuais na maior parte dos
casos.
```

## Página 16

```text
TASKIFY — PGCS DevOps


11. Marcos
Marcos internos relacionados ao esforço de GCS/DevOps do projeto Taskify:

 Marco                                                                               Status

 Estruturação inicial do projeto (Node.js, módulos health/user, testes com Vitest)   Concluído

 Implantação do pipeline de CI (GitHub Actions com lint + testes + auditoria de
                                                                                     Planejado
 dependências)

 Adoção de Docker e publicação de imagem versionada                                  Planejado

 Implantação do pipeline de CD (staging → produção)                                  Planejado

 Primeira release automatizada com tag SemVer e changelog gerado                     Planejado

 Adoção de IaC completa para os ambientes de Homologação e Produção                  Planejado
```

## Página 17

```text
TASKIFY — PGCS DevOps


12. Treinamento e Recursos
Para implementar e manter as práticas de CI/CD, IaC e as demais atividades de GCS descritas neste plano,
recomenda-se ao responsável pelo Taskify:
   •   Aprofundamento em GitHub Actions (sintaxe de workflows YAML, secrets, ambientes protegidos).
   •   Estudo de contêinerização com Docker, incluindo boas práticas de imagens Node.js (multi-stage
       build, imagens slim).
   •   Configuração de ESLint e ferramentas de análise estática para projetos Node.js/ESM.
   •   Boas práticas de Conventional Commits e geração automática de changelog (ex.: semantic-release).
   •   Noções de observabilidade (logs estruturados, métricas) para complementar o endpoint
       /api/health já existente.
```

## Página 18

```text
TASKIFY — PGCS DevOps


13. Controle de Software de Subcontratados, Fornecedores e Dependências de
Terceiros
Bibliotecas de terceiros integradas ao Taskify também são itens de configuração e são versionadas
explicitamente por meio do lockfile (package-lock.json). As dependências atualmente declaradas no
package.json são:

 Pacote               Versão          Tipo                            Finalidade

                                                                      Carregamento de variáveis de
 dotenv               ^17.4.2         Dependência de produção
                                                                      ambiente (.env)

                                      Dependência de                  Recarregamento automático do
 nodemon              ^3.1.14
                                      desenvolvimento                 servidor durante o desenvolvimento

                                      Dependência de                  Execução da suíte de testes
 vitest               ^3.2.4
                                      desenvolvimento                 automatizados
    •     Análise automática de vulnerabilidades em dependências (SCA) — recomenda-se integrar "npm
          audit" e/ou Dependabot ao pipeline de CI assim que este for criado.
    •     Atualizações de dependências devem ser propostas automaticamente (ex.: Dependabot/Renovate)
          e submetidas ao mesmo fluxo de PR definido na seção 8.1.
Não há, no momento, software desenvolvido por subcontratados ou fornecedores externos incorporado ao Taskify — o
projeto é de autoria própria, utilizando apenas bibliotecas de código aberto listadas acima.
```

## Página 19

```text
TASKIFY — PGCS DevOps


14. Quadro-Resumo do Pipeline CI/CD
Resumo do fluxo padrão definido para o Taskify, do commit à produção (a ser implementado conforme as
seções 5 e 6):

 Etapa                Descrição                                                     Gatilho

                      Checkout, instalação de dependências (npm ci), lint, testes
                                                                                    Abertura/atualização de
 CI                   unitários/integração (Vitest), auditoria de dependências
                                                                                    Pull Request
                      (npm audit), publicação do artefato/imagem.

 Merge                Integração da mudança na branch principal (master).           Aprovação de PR + CI verde

                      Deploy automático em homologação + testes de aceitação
 CD — Staging                                                                       Merge na branch principal
                      dos fluxos de usuário.

                      Aprovação para produção (manual no estágio atual do           Sucesso dos testes em
 Gate de Release
                      projeto).                                                     staging

                      Deploy (rolling update inicialmente), smoke test em           Aprovação do gate de
 CD — Produção
                      /api/health, geração de baseline/tag.                         release


Nota: este plano deve ser revisado e atualizado à medida que o projeto Taskify evolui (novas ferramentas, aumento
da equipe, maior criticidade do sistema em produção), mantendo os quatro pilares da GCS — identificação, controle
de versão, controle de mudanças e auditoria/status — agora suportados por automação.
```

