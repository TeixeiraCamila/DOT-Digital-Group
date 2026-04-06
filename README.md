# Teste Técnico - Desenvolvedora Frontend (EdTech)

## Objetivo

Implementar integralmente a página disponibilizada no Figma, respeitando layout, interações, estados e comportamentos definidos.

## Requisitos Técnicos Obrigatórios

### Tecnologias
- HTML5
- CSS
- JavaScript Vanilla

### Proibido
- Frameworks CSS (Bootstrap, Tailwind, etc.)
- Frameworks JavaScript (React, Vue, Angular, etc.)

## Responsividade

A página deve:
- Funcionar corretamente em desktop
- Funcionar corretamente em dispositivos móveis
- Adaptar todos os componentes adequadamente

## Componentes Obrigatórios

### Player de Vídeo
- Deve ser funcional
- Deve aceitar ao menos mídia do YouTube
- Deve ser responsivo
- Pode utilizar plugin para embed

### Imagem Lateral
- Deve ser responsiva
- Deve respeitar o layout do Figma

### Slider
- Slider simples de imagens
- Mínimo de 3 imagens
- Estados obrigatórios: Normal, Hover, Disabled
- Pode ser implementado do zero ou utilizar Swiper

### Player de Áudio
- Player simples
- Funcionalidades básicas de reprodução
- Pode utilizar plugin

### Recurso de Destaque
- Implementação simples
- Deve ser responsivo

### Cards Interativos
- Ao clicar em "Abrir", o card deve expandir
- Ao clicar novamente, ele deve fechar
- A interação deve estar totalmente funcional

## Atividades (Obrigatoriamente do Zero)

> ⚠️ Não é permitido utilizar plugins para as atividades.

### Persistência (Obrigatório)
Os dados inseridos nas atividades devem:
- Ser salvos no `sessionStorage`
- Ser restaurados automaticamente ao atualizar a página

Restaurar:
- Conteúdo preenchido
- Feedback exibido
- Estado dos botões
- Opção selecionada

### Atividade Discursiva

**Comportamento esperado:**
1. Usuário preenche o `textarea`
2. Clica em "Responder"
3. Feedback é exibido
4. Botão Responder é desabilitado
5. Botão Alterar é habilitado

**Ao clicar em "Alterar":**
- Botão Alterar fica desabilitado
- Botão Responder volta a ficar habilitado
- Usuário pode modificar a resposta

### Atividade Objetiva

- Seleção via checkbox

**Comportamento:**
1. Ao selecionar:
   - Item deve ser destacado
   - Botão Responder fica habilitado

2. Ao clicar em "Responder":
   - Feedback é exibido
   - Botão Responder é desabilitado
   - Botão Alterar é habilitado

3. Ao clicar em "Alterar":
   - Permite nova tentativa
   - Estados dos botões são invertidos

### FAQ (Accordion)

- Implementação preferencialmente com recursos nativos
- Ao clicar:
  - Item fica ativo
  - Destacado em verde
  - Conteúdo expande
- Ao clicar novamente:
  - Conteúdo recolhe

## Diferenciais (Não Obrigatórios)

### Animações
- Microinterações bem aplicadas
- Transições suaves entre estados
- Animações que agreguem à experiência do usuário
- Uso consciente de performance (evitar animações pesadas)

### Acessibilidade
- Uso adequado de HTML semântico
- Labels corretamente associados a inputs
- Navegação por teclado funcional
- Estados de foco visíveis
- Uso apropriado de atributos ARIA quando necessário
- Contraste adequado entre texto e fundo

## Entrega

- Repositório público no GitHub
- README explicando:
  - Como rodar
  - Decisões técnicas
  - Estrutura do projeto

---

## Como Rodar

### Opção 1: Abrir diretamente
1. Clone o repositório
2. Abra o arquivo `index.html` no navegador

### Opção 2: Servidor local (recomendado)
```bash
# Python 3
python -m http.server 8000

# Node.js (se disponível)
npx serve
```
Then access `http://localhost:8000`

## Decisões Técnicas

- **CSS**: Puro com metodologia BEM, sem frameworks
- **JavaScript**: Vanilla sem dependências externas (exceto Howler.js para áudio)
- **Plugins**: YouTube embed, Howler.js (player áudio)
- **Persistência**: sessionStorage para atividades (conforme requisito)
- **Acessibilidade**: HTML semântico, ARIA labels, navegação por teclado
- **Responsividade**: Layout adaptável para desktop e mobile

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
