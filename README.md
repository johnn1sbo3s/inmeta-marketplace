# Inmeta Cards Marketplace

Este é o projeto de front-end para o desafio técnico de **Desenvolvedor Front-End Pleno** da INMETA. O objetivo é um marketplace de troca de cartas, onde os usuários podem visualizar cartas, adicionar cartas à sua coleção e criar ou excluir solicitações de troca.

**Link do projeto em produção (Vercel):** [https://inmeta-marketplace-liart.vercel.app/](https://inmeta-marketplace-liart.vercel.app/)

## Tecnologias e Ferramentas

O projeto foi construído com as melhores práticas para aplicações modernas e de alta performance, utilizando:

- **Vue 3** (Composition API & `<script setup>`)
- **TypeScript** para maior segurança com tipagem forte e prevenção de bugs.
- **Vite** como build tool para prover carregamentos locais instantâneos.
- **Pinia** para gerenciamento de estado global.
- **Vue Router** para o roteamento limpo do contexto SPA.
- **Tailwind CSS** para estilização utilitária e desenvolvimento de UI veloz.
- **TanStack Query (Vue Query)** para gerenciamento de estado do servidor de forma robusta.
- **Axios** para interações e interceptors globais de rotas da API REST.
- **Nuxt UI & Iconify** para componentes acessíveis e biblioteca de ícones padronizada.

## Arquitetura do Projeto

A base de código segue uma estrutura limpa baseada em recursos (Feature-based/Atomic) visando alta escalabilidade e separação clara de responsabilidades:

- `src/components/`: Componentes visuais da interface.
  - `layout/`: Partes estruturais (Navbar, Sidebar) que constroem o esqueleto da aplicação.
  - `ui/`: Componentes elementares consistentes compartilhados.
- `src/pages/`: Componentes complexos que montam views inteiras via roteamento.
- `src/services/`: Configuração do Axios e instâncias de client da API.
- `src/stores/`: Gerenciamento de estado global no lado do cliente com Pinia (dados de Sessão, Modais, Interface).
- `src/composables/`: Funções reaproveitáveis e lógicas de estado via Vue Query (ex: `useTrades`, `useCards`, interações assíncronas encapsuladas).
- `src/constants/`: Valores fixos para fácil reuso e manutenção.
- `src/router/`: Configurações de navegação, carregamento sob demanda (Lazy Loading adaptado) e validações de rotas protegidas.

## Decisões Técnicas de Destaque

Durante o projeto, adotei estratégias no Front-End para mitigar algumas limitações da API preservando a UX máxima:

### 1. TanStack Query para Caching e Otimização
O projeto se apoia fortemente no **TanStack Query**. Sua atuação permite armazenar chamadas de rede em cache de curto a médio prazo. Isso deduplica requests (se dois componentes requisitarem as cartas ao mesmo tempo, apenas um call sai do browser), permite repetições silenciosas em caso de instabilidade, e gerencia flags de _isPending_, _isLoading_ e _isFetching_ perfeitamente.

### 2. Store do Pinia para Detalhes da Trade
A aplicação possui uma visualização de "Detalhes da Troca". Como **a API não fornece um endpoint para buscar dados unitários de uma troca (ex: `GET /trades/:id`)**, usei o Pinia para guardar o objeto da _trade_ quando o usuário clica sobre o card na lista e transito de rota consumindo a store em vez de buscar novamente. Caso a view exija um refresh direto (F5), implementei middlewares no roteador para devolver o usuário à lista de trade em vez de mostrar a tela quebrada sem dados.

### 3. Exclusão de Trocas Ativas
Um dos requisitos é que o usuário "pode deletar solicitações de troca que criou". Como **não há um endpoint de `GET /me/trades`**, não foi possível isolar uma visualização de "Minhas Trocas" com precisão ou paginação nativa. Logo, a funcionalidade de deleção foi embutida internamente ao consultar a listagem de trocas em `GET /trades` (listagem geral). Se o usuário autenticado entrar nos detalhes de sua própria proposta, o botão se apresentará permitindo apagar a request.

### 4. Filtros e Pesquisa Local
Construí recursos extras de filtro/pesquisa (notável na visualização de _Minhas Cartas_). Contudo, devido aos endpoints (como o de cartas associadas do usuário `GET /me/cards`) retornarem os registros de uma só vez em vez de um sistema encadeado em blocos por paginação orientada a API, os filtros e métodos de busca são aplicados na **memória do navegador via Front-end (Client-Side)**. Futuramente, em melhorias, parâmetros de Query na API fariam esse peso deixar o Front-End para trazer apenas a matriz requerida.

### 5. Deploy Escalável (Vercel)
Optei pelo ecossistema Vercel sob uma CDN Global para o deploy real, a qual foi injetado um arquivo customizado de direcionamentos (rewrite em `vercel.json`) para que a mecânica "history" do Vue Router performe acessos profundos via URL do SPA impedindo páginas em branco por 404 estático do Nginx/Servidor da edge. A URL base da API também usa _Environment Variables_ sem injetar _hardcoded paths_ na fonte.

## Como executar o projeto localmente

Clonando o prejeto e configurando o ambiente:

1. Clone o repositório.
2. Crie uma cópia ou renomeie o `env.example` para `.env` e preencha a propriedade `VITE_API_URL`.
3. Certifique-se de estar utilizando Node 18+ e instale os pacotes base:
```bash
pnpm install
```
4. Suba o servidor de desenvolvimento:
```bash
pnpm run dev
```
