# EdTech - Teste Técnico Frontend

## Como Rodar

### Opção 1: Arquivo direto
Abra o arquivo `index.html` no navegador.

### Opção 2: Servidor local (recomendado)
```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve
```
Acesse: `http://localhost:8000`

## Decisões Técnicas

- **CSS**: Puro com metodologia BEM
- **JavaScript**: Vanilla (sem frameworks)
- **Plugins**: YouTube embed, Howler.js (áudio)
- **Persistência**: sessionStorage
- **Acessibilidade**: HTML semântico, ARIA, navegação por teclado

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
