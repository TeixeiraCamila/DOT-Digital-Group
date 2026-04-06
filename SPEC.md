# Teste Técnico - Desenvolvedor Frontend EdTech

## Requisitos Técnicos Obrigatórios

### Tecnologias
- **HTML5**
- **CSS** (puro, sem frameworks)
- **JavaScript Vanilla** (sem frameworks/bibliotecas como React, Vue, Angular)

### Restrições
- **NÃO é permitido utilizar frameworks CSS** (Bootstrap, Tailwind, etc.)
- **NÃO é permitido utilizar frameworks JavaScript** (React, Vue, Angular, etc.)

### Plugins Permitidos
- Player de Vídeo: YouTube embed ou similar
- Slider: Swiper ou implementação própria
- Player de Áudio: plugins simples

---

## Responsividade

A página deve:
- Funcionar corretamente em desktop
- Funcionar corretamente em dispositivos móveis
- Adaptar todos os componentes adequadamente

---

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
- Pode ser implementado do zero ou utilizando Swiper

### Player de Áudio
- Player simples
- Funcionalidades básicas de reprodução
- Pode utilizar plugin

### Cards Interativos
- Ao clicar em "Abrir", o card deve expandir
- Ao clicar novamente, ele deve fechar
- A interação deve estar totalmente funcional

### FAQ (Accordion)
- Implementação preferencialmente com recursos nativos
- Ao clicar: item fica ativo, destacado em verde, conteúdo expande
- Ao clicar novamente: conteúdo recolhe

---

## Atividades (Obrigatoriamente do Zero)

**NÃO é permitido utilizar plugins para as atividades.**

### Atividade Discursiva
Comportamento esperado:
1. Usuário preenche o textarea
2. Clica em "Responder"
3. Feedback é exibido
4. Botão Responder é desabilitado
5. Botão Alterar é habilitado

Ao clicar em "Alterar":
- Botão Alterar fica desabilitado
- Botão Responder volta a ficar habilitado
- Usuário pode modificar a resposta

### Atividade Objetiva
- Seleção via checkbox

Comportamento:
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

---

## Persistência (Obrigatório)

Os dados inseridos nas atividades devem:
- Ser salvos no **sessionStorage**
- Ser restaurados automaticamente ao atualizar a página

Restaurar:
- Conteúdo preenchido
- Feedback exibido
- Estado dos botões
- Opção selecionada

---

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

---

## Estrutura do Projeto

```
projeto/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   ├── images/
│   └── audio/
└── README.md
```

---

## Padrões de Código

### CSS - Metodologia BEM
- **B**lock: componente isolado (`.card`)
- **E**lement: parte do bloco (`.card__title`)
- **M**odifier: variação do bloco (`.card--active`)

### JavaScript
- Funções modulares
- Eventos com delegação quando apropriado
- Nomes descritivos para variáveis e funções
- Comentários apenas quando necessário

### HTML
- Semântico (header, main, section, footer, etc.)
- Atributos ARIA para acessibilidade
- Estrutura lógica e organizada

---

## Entrega

- Repositório público no GitHub
- README explicando:
  - Como rodar
  - Decisões técnicas
  - Estrutura do projeto