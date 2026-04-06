# Teste Técnico - Desenvolvedor Frontend EdTech

## Objetivo

Implementar integralmente a página disponibilizada no Figma, respeitando layout, interações, estados e comportamentos definidos.

## Requisitos Técnicos Obrigatórios

### Tecnologias
- HTML5
- CSS (puro)
- JavaScript Vanilla

### Proibido
- Frameworks CSS (Bootstrap, Tailwind, etc.)
- Frameworks JavaScript (React, Vue, Angular, etc.)

## Componentes Obrigatórios

| Componente | Requisitos |
|------------|-------------|
| Player de Vídeo | Funcional, YouTube embed, responsivo |
| Imagem Lateral | Responsiva, layout Figma |
| Slider | Mínimo 3 imagens, estados Normal/Hover/Disabled |
| Player de Áudio | Funcionalidades básicas |
| Cards Interativos | Expandir/recolher ao clicar |
| FAQ (Accordion) | Recursos nativos |
| Atividades | Implementação do zero (sem plugins) |
| Persistência | sessionStorage (obrigatório) |

## Atividades

### Discursiva
- Textarea com botões Responder/Alterar
- Estados alternados entre botões

### Objetiva
- Checkbox com destaque
- Feedback ao responder

## Diferenciais

- Animações e microinterações
- Acessibilidade (HTML semântico, ARIA, navegação teclado)

## Como Rodar

1. Clone o repositório
2. Abra `index.html` no navegador

## Decisões Técnicas

- CSS puro com metodologia BEM
- JavaScript Vanilla sem dependências
- Plugins permitidos: YouTube embed, Swiper (slider), player áudio

## Estrutura do Projeto

```
/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   ├── images/
│   └── audio/
├── SPEC.md
└── README.md
```