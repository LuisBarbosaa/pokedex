# Pokedex

> Aplicacao web de Pokedex desenvolvida em React, consumindo a PokeAPI.
> Trabalho individual — [SEU NOME] — [NOME DO CURSO] — [ANO]

## Link da Aplicacao Online

[Acesse a Pokedex aqui](https://Luisbarbosa.github.io/pokedex/)

## Descricao

A Pokedex e uma aplicacao que lista os 151 Pokemon originais (Geracao I)
consumindo dados da [PokeAPI](https://pokeapi.co). O usuario pode:

- Visualizar todos os Pokemon em cards com nome e imagem
- Buscar um Pokemon pelo nome
- Clicar em um card para ver detalhes: tipos, altura, peso, habilidades e status base

## Tecnologias Utilizadas

| Tecnologia       | Versao | Finalidade                       |
| ---------------- | ------ | -------------------------------- |
| React            | 18.x   | Framework principal da interface |
| Vite             | 5.x    | Ferramenta de build              |
| React Router DOM | 6.x    | Navegacao e rotas dinamicas      |
| Axios            | 1.x    | Requisicoes HTTP para a API      |
| PokeAPI          | —      | API publica de dados de Pokemon  |
| GitHub Pages     | —      | Hospedagem da aplicacao          |

## Como Instalar e Rodar Localmente

**Pre-requisitos:** Node.js instalado (versao 18 ou superior)

```bash
# Clonar o repositorio
git clone https://github.com/Luisbarbosa/pokedex.git

# Entrar na pasta
cd pokedex

# Instalar as dependencias
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

Acesse em: http://localhost:5173/pokedex/

## Como Fazer o Deploy

```bash
npm run deploy
```

## Arquitetura da Aplicacao

```txt
src/
├── components/
│   ├── Header.jsx        # Cabecalho com navegacao para a home
│   ├── PokemonCard.jsx   # Card de cada Pokemon na listagem
│   └── Loading.jsx       # Indicador de carregamento
├── pages/
│   ├── Home.jsx          # Pagina principal com lista e busca
│   └── PokemonDetail.jsx # Pagina de detalhes (rota dinamica)
├── services/
│   └── api.js            # Funcoes de acesso a PokeAPI
├── App.jsx               # Configuracao de rotas
└── main.jsx              # Ponto de entrada da aplicacao
```

### Fluxo de Rotas

| Rota           | Componente        | Descricao                         |
| -------------- | ----------------- | --------------------------------- |
| /              | Home.jsx          | Lista todos os Pokemon com busca  |
| /pokemon/:name | PokemonDetail.jsx | Detalhes de um Pokemon especifico |

## Prints da Aplicacao

### Tela Principal — Lista de Pokemon

![Tela Principal](./screenshots/home.png)

### Tela de Detalhes de um Pokemon

![Detalhes](./screenshots/detail.png)

## API Utilizada

**PokeAPI** — https://pokeapi.co

API REST publica, gratuita e sem necessidade de autenticacao.

Endpoints utilizados:

- `GET /pokemon?limit=151` — Lista os Pokemon
- `GET /pokemon/{name}` — Detalhes de um Pokemon
