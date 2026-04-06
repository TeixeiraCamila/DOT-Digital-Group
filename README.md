# EdTech - Teste Técnico Frontend

## Deploy

Acesse: https://dot-digital-group.vercel.app

## Como Rodar (Local)

### Opção 1: Arquivo direto
Abra o arquivo `index.html` no navegador.

### Opção 2: Servidor local
```bash
npx serve
```
Acesse: `http://localhost:3000`

## Decisões Técnicas

- **CSS**: Puro com metodologia BEM
- **JavaScript**: Vanilla (sem frameworks)
- **Plugins**: YouTube embed (vídeo), Howler.js (áudio)
- **Persistência**: sessionStorage
- **Acessibilidade**: HTML semântico, ARIA, navegação por teclado
- **Vídeo**: YouTube embed com overlay preto antes do play (sem iframe automático)
- **Áudio**: Howler.js para controle via JavaScript (play, pause, progresso, volume)

## Estrutura do Projeto

```
/
├── index.html
├── css/
│   ├── styles.css
│   ├── reset.css
│   └── variables.css
├── js/
│   └── main.js
├── assets/
│   └── images/
├── SPEC.md
└── README.md
```
