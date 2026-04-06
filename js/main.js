document.addEventListener('DOMContentLoaded', function () {
  // Fade-in on scroll
  const fadeElements = document.querySelectorAll('.video-section, .image-section, .slider-section, .highlight-section, .cards-section, .text-section, .podcast-section, .activities-section, .faq-section');
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  fadeElements.forEach(el => {
    el.classList.add('fade-in')
    fadeObserver.observe(el)
  })

  // Video Overlay
  const videoOverlay = document.querySelector('.video-section__overlay')
  const videoIframe = document.getElementById('video-section__iframe')

  if (videoOverlay && videoIframe) {
    function playVideo() {
      videoOverlay.classList.add('hidden')
      const src = videoIframe.src
      if (!src.includes('autoplay=1')) {
        videoIframe.src = src + '&autoplay=1'
      }
    }

    videoOverlay.addEventListener('click', playVideo)
    videoOverlay.addEventListener('keydown', function (e) {
      if (e.code === 'Enter' || e.code === 'Space') {
        e.preventDefault()
        playVideo()
      }
    })
  }

  // Podcast Player (Howler.js)
  const podcastPlayer = document.querySelector('.podcast-player')

  if (podcastPlayer) {
    const audioSrc = podcastPlayer.dataset.audio
    const playBtn = podcastPlayer.querySelector('.podcast-player__btn-play')
    const progressContainer = podcastPlayer.querySelector(
      '.podcast-player__progress-container'
    )
    const progressFilled = podcastPlayer.querySelector(
      '.podcast-player__progress-filled'
    )
    const currentTimeEl = podcastPlayer.querySelector(
      '.podcast-player__current-time'
    )
    const totalTimeEl = podcastPlayer.querySelector(
      '.podcast-player__total-time'
    )
    const volumeBar = podcastPlayer.querySelector('.podcast-player__volume-bar')
    const volumeFilled = podcastPlayer.querySelector(
      '.podcast-player__volume-filled'
    )
    const volumeBtn = podcastPlayer.querySelector('.podcast-player__btn-volume')
    const resetBtn = podcastPlayer.querySelector('.podcast-player__btn-reset')

    const sound = new Howl({
      src: [audioSrc],
      html5: true,
      volume: 0.66,
      onload: function () {
        const duration = sound.duration()
        totalTimeEl.textContent = formatTime(duration)
      },
      onplay: function () {
        playBtn.innerHTML = `<svg width="14" height="18" viewBox="0 0 14 18" fill="none" aria-hidden="true"><path d="M1 3H4V15H1V3ZM10 3H13V15H10V3Z" fill="#475569"/></svg>`
        playBtn.setAttribute('aria-label', 'Pausar')
        requestAnimationFrame(updateProgress)
      },
      onpause: function () {
        playBtn.innerHTML = `<svg class="podcast-player__icon-play" width="14" height="18" viewBox="0 0 14 18" fill="none" aria-hidden="true"><path d="M1 1L13 9L1 17V1Z" fill="#475569"/></svg>`
        playBtn.setAttribute('aria-label', 'Reproduzir')
      },
      onend: function () {
        playBtn.innerHTML = `<svg class="podcast-player__icon-play" width="14" height="18" viewBox="0 0 14 18" fill="none" aria-hidden="true"><path d="M1 1L13 9L1 17V1Z" fill="#475569"/></svg>`
        playBtn.setAttribute('aria-label', 'Reproduzir')
        progressFilled.style.width = '0%'
        currentTimeEl.textContent = '00:00'
        totalTimeEl.textContent = formatTime(sound.duration())
      },
    })

    let isPlaying = false
    let isDragging = false

    function formatTime(time) {
      const min = Math.floor(time / 60)
      const sec = Math.floor(time % 60)
        .toString()
        .padStart(2, '0')
      return `${min}:${sec}`
    }

    function updateProgress() {
      if (sound.playing()) {
        const percent = (sound.seek() / sound.duration()) * 100
        progressFilled.style.width = percent + '%'
        progressContainer.setAttribute('aria-valuenow', Math.round(percent))
        currentTimeEl.textContent = formatTime(sound.seek())
        requestAnimationFrame(updateProgress)
      }
    }

    // Play/Pause
    playBtn.addEventListener('click', function () {
      if (sound.playing()) {
        sound.pause()
      } else {
        sound.play()
      }
    })

    // Clique na barra de progresso
    progressContainer.addEventListener('click', function (e) {
      e.stopPropagation()
      const duration = sound.duration()
      if (!duration || isNaN(duration)) return

      const rect = progressContainer.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const percent = Math.max(0, Math.min(1, clickX / rect.width))
      sound.seek(percent * duration)
      progressFilled.style.width = percent * 100 + '%'
    })

    // Drag na barra de progresso
    progressContainer.addEventListener('mousedown', function (e) {
      e.stopPropagation()
      const duration = sound.duration()
      if (!duration || isNaN(duration)) return

      isDragging = true

      // Move immediately on mousedown
      const rect = progressContainer.getBoundingClientRect()
      let pos = e.clientX - rect.left
      pos = Math.max(0, Math.min(pos, rect.width))
      const percent = pos / rect.width
      sound.seek(percent * duration)
      progressFilled.style.width = percent * 100 + '%'
      currentTimeEl.textContent = formatTime(percent * duration)
    })

    window.addEventListener('mouseup', function () {
      if (isDragging) {
        isDragging = false
      }
    })

    window.addEventListener('mousemove', function (e) {
      if (!isDragging) return
      const duration = sound.duration()
      if (!duration || isNaN(duration)) return

      const rect = progressContainer.getBoundingClientRect()
      let pos = e.clientX - rect.left
      pos = Math.max(0, Math.min(pos, rect.width))
      const percent = pos / rect.width
      progressFilled.style.width = percent * 100 + '%'
      currentTimeEl.textContent = formatTime(percent * duration)
    })

    // Volume
    if (volumeBar) {
      volumeBar.addEventListener('click', function (e) {
        const rect = volumeBar.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const percent = clickX / rect.width
        sound.volume(percent)
        volumeFilled.style.width = percent * 100 + '%'
        volumeBar.setAttribute('aria-valuenow', Math.round(percent * 100))
      })
    }

    // Toggle mute
    if (volumeBtn) {
      volumeBtn.addEventListener('click', function () {
        const currentVol = sound.volume()
        if (currentVol > 0) {
          sound.volume(0)
          volumeFilled.style.width = '0%'
          volumeBar.setAttribute('aria-valuenow', 0)
          volumeBtn.setAttribute('aria-label', 'Ativar volume')
        } else {
          sound.volume(0.66)
          volumeFilled.style.width = '66%'
          volumeBar.setAttribute('aria-valuenow', 66)
          volumeBtn.setAttribute('aria-label', 'Silenciar')
        }
      })
    }

    // Reset
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        sound.seek(0)
        sound.pause()
        progressFilled.style.width = '0%'
        currentTimeEl.textContent = '00:00'
        playBtn.innerHTML = `<svg class="podcast-player__icon-play" width="14" height="18" viewBox="0 0 14 18" fill="none" aria-hidden="true"><path d="M1 1L13 9L1 17V1Z" fill="#475569"/></svg>`
        playBtn.setAttribute('aria-label', 'Reproduzir')
      })
    }

    // Teclado (acessibilidade) - só pausa se já estiver tocando
    document.addEventListener('keydown', function (e) {
      if (e.code === 'Space') {
        if (sound.playing()) {
          e.preventDefault()
          sound.pause()
        }
      }
    })

    // Focus states para acessibilidade
    const focusableElements = podcastPlayer.querySelectorAll(
      'button, [role="slider"]'
    )
    focusableElements.forEach(function (el) {
      el.addEventListener('keydown', function (e) {
        if (e.code === 'ArrowRight' || e.code === 'ArrowUp') {
          e.preventDefault()
          if (el.getAttribute('role') === 'slider') {
            const rect = el.getBoundingClientRect()
            const current = parseFloat(el.getAttribute('aria-valuenow') || 0)
            el.setAttribute('aria-valuenow', Math.min(100, current + 10))
          }
        } else if (e.code === 'ArrowLeft' || e.code === 'ArrowDown') {
          e.preventDefault()
          if (el.getAttribute('role') === 'slider') {
            const current = parseFloat(el.getAttribute('aria-valuenow') || 0)
            el.setAttribute('aria-valuenow', Math.max(0, current - 10))
          }
        }
      })
    })
  }

  // Atividade Discursiva
  const discursiveTextarea = document.getElementById('discursive-answer')
  const discursiveSubmitBtn = document.getElementById('discursive-submit')
  const discursiveEditBtn = document.getElementById('discursive-edit')
  const discursiveFeedback = document.getElementById('discursive-feedback')

  if (
    discursiveTextarea &&
    discursiveSubmitBtn &&
    discursiveEditBtn &&
    discursiveFeedback
  ) {
    const STORAGE_KEY = 'edtech_discursive_answer'

    function updateButtons() {
      const hasContent = discursiveTextarea.value.trim().length > 0
      discursiveSubmitBtn.disabled = !hasContent
      discursiveEditBtn.disabled = hasContent
    }

    function showFeedback() {
      discursiveFeedback.innerHTML = `
        <div class="feedback success">
          <div class="feedback__content">
            <strong>É isso aí!</strong>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur commodi odio maiores accusamus aspernatur consequatur ipsam dignissimos magnam hic, velit est perferendis explicabo aperiam ratione veritatis labore.</p>
          </div>
          <button class="feedback__close" aria-label="Fechar">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1L13 13M13 1L1 13" stroke="#15803d" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      `
      discursiveFeedback.classList.add('activity-discursive__feedback--success')
      discursiveSubmitBtn.disabled = true
      discursiveEditBtn.disabled = false
      discursiveTextarea.disabled = true

      const closeBtn = discursiveFeedback.querySelector('.feedback__close')
      if (closeBtn) {
        closeBtn.addEventListener('click', function () {
          hideFeedback()
        })
      }

      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          answer: discursiveTextarea.value,
          submitted: true,
        })
      )
    }

    function hideFeedback() {
      discursiveFeedback.innerHTML = ''
      discursiveFeedback.classList.remove(
        'activity-discursive__feedback--success'
      )
      discursiveSubmitBtn.disabled = false
      discursiveEditBtn.disabled = true
      discursiveTextarea.disabled = false
    }

    discursiveTextarea.addEventListener('input', function () {
      updateButtons()
    })

    discursiveSubmitBtn.addEventListener('click', function () {
      showFeedback()
    })

    discursiveEditBtn.addEventListener('click', function () {
      hideFeedback()
      discursiveTextarea.focus()
    })

    const stored = sessionStorage.getItem(STORAGE_KEY)
    if (stored) {
      const data = JSON.parse(stored)
      if (data.submitted && data.answer) {
        discursiveTextarea.value = data.answer
        showFeedback()
      }
    }
  }

  // Atividade Objetiva
  const objectiveOptions = document.querySelectorAll('.option-item');
  const objectiveSubmitBtn = document.getElementById('objective-submit');
  const objectiveEditBtn = document.getElementById('objective-edit');
  const objectiveFeedback = document.getElementById('objective-feedback');
  
  if (objectiveOptions.length && objectiveSubmitBtn && objectiveEditBtn && objectiveFeedback) {
    const STORAGE_KEY = 'edtech_objective_answer';
    const CORRECT_ANSWER = 'b';
    
    function updateButtons() {
      const hasSelection = document.querySelector('.option-item__input:checked') !== null;
      objectiveSubmitBtn.disabled = !hasSelection;
      objectiveEditBtn.disabled = hasSelection;
    }
    
    function highlightSelectedOption() {
      objectiveOptions.forEach(option => {
        const input = option.querySelector('.option-item__input');
        if (input.checked) {
          option.classList.add('option-item--selected');
        } else {
          option.classList.remove('option-item--selected');
        }
      });
    }
    
    function showFeedback(isCorrect) {
      if (isCorrect) {
        objectiveFeedback.innerHTML = `
          <div class="feedback success">
            <div class="feedback__content">
              <strong>É isso aí!</strong>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur commodi odio maiores aspernatur consequatur ipsam dignissimos magnam hic, velit est perferendis explicabo aperiam ratione veritatis labore.</p>
            </div>
            <button class="feedback__close" aria-label="Fechar">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 1L13 13M13 1L1 13" stroke="#15803d" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
        `;
        objectiveFeedback.classList.add('activity-objective__feedback--success');
      } else {
        objectiveFeedback.innerHTML = `
          <div class="feedback error">
            <div class="feedback__content">
              <strong>Tente novamente!</strong>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur commodi odio maiores aspernatur consequatur ipsam dignissimos magnam hic, velit est perferendis explicabo aperiam ratione veritatis labore.</p>
            </div>
            <button class="feedback__close" aria-label="Fechar">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 1L13 13M13 1L1 13" stroke="#854d0e" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
        `;
        objectiveFeedback.classList.add('activity-objective__feedback--error');
      }
      
      objectiveSubmitBtn.disabled = true;
      objectiveEditBtn.disabled = false;
      objectiveOptions.forEach(opt => opt.classList.add('option-item--disabled'));
      
      const selectedInput = document.querySelector('.option-item__input:checked');
      const selectedValue = selectedInput ? selectedInput.value : null;
      
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
        selected: selectedValue,
        submitted: true,
        isCorrect: isCorrect
      }));
      
      const closeBtn = objectiveFeedback.querySelector('.feedback__close');
      if (closeBtn) {
        closeBtn.addEventListener('click', function() {
          hideFeedback();
        });
      }
    }
    
    function hideFeedback() {
      objectiveFeedback.innerHTML = '';
      objectiveFeedback.classList.remove('activity-objective__feedback--success', 'activity-objective__feedback--error');
      objectiveSubmitBtn.disabled = false;
      objectiveEditBtn.disabled = true;
      objectiveOptions.forEach(opt => {
        opt.classList.remove('option-item--disabled', 'option-item--selected');
        const input = opt.querySelector('.option-item__input');
        input.checked = false;
      });
    }
    
    objectiveOptions.forEach(option => {
      const input = option.querySelector('.option-item__input');
      
      input.addEventListener('change', function() {
        highlightSelectedOption();
        updateButtons();
      });
      
      option.addEventListener('click', function() {
        highlightSelectedOption();
        updateButtons();
      });
    });
    
    objectiveSubmitBtn.addEventListener('click', function() {
      const selectedInput = document.querySelector('.option-item__input:checked');
      const isCorrect = selectedInput && selectedInput.value === CORRECT_ANSWER;
      showFeedback(isCorrect);
    });
    
    objectiveEditBtn.addEventListener('click', function() {
      hideFeedback();
    });
    
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      if (data.submitted && data.selected) {
        const optionToSelect = document.querySelector(`.option-item input[value="${data.selected}"]`);
        if (optionToSelect) {
          optionToSelect.checked = true;
          highlightSelectedOption();
          showFeedback(data.isCorrect);
        }
      }
    }
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-item__trigger');
    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('faq-item--active');
      
      // Close all items
      faqItems.forEach(i => {
        i.classList.remove('faq-item--active');
        i.querySelector('.faq-item__trigger').setAttribute('aria-expanded', 'false');
      });
      
      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('faq-item--active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Slider
  const sliderSection = document.querySelector('.slider-section')
  
  if (sliderSection) {
    const slides = sliderSection.querySelectorAll('.slider-slide')
    const prevBtn = sliderSection.querySelector('.slider-btn--prev')
    const nextBtn = sliderSection.querySelector('.slider-btn--next')
    const paginationContainer = sliderSection.querySelector('.slider-pagination')

    if (slides.length && prevBtn && nextBtn && paginationContainer) {
      let currentIndex = 0
      const totalSlides = slides.length

      // Criar dots de paginação
      slides.forEach((_, index) => {
        const dot = document.createElement('button')
        dot.classList.add('slider-pagination-dot')
        if (index === 0) {
          dot.classList.add('active')
        }
        dot.setAttribute('aria-label', `Slide ${index + 1}`)
        dot.addEventListener('click', () => goToSlide(index))
        paginationContainer.appendChild(dot)
      })

      const dots = paginationContainer.querySelectorAll('.slider-pagination-dot')

      function updatePagination() {
        dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === currentIndex)
        })
        prevBtn.disabled = currentIndex === 0
        nextBtn.disabled = currentIndex === totalSlides - 1
      }

      function goToSlide(index) {
        if (index >= 0 && index < totalSlides) {
          currentIndex = index
          slides.forEach((slide, i) => {
            if (i === currentIndex) {
              slide.classList.add('active')
            } else {
              slide.classList.remove('active')
            }
          })
          updatePagination()
        }
      }

      function nextSlide() {
        if (currentIndex < totalSlides - 1) {
          goToSlide(currentIndex + 1)
        }
      }

      function prevSlide() {
        if (currentIndex > 0) {
          goToSlide(currentIndex - 1)
        }
      }

      // Event listeners
      prevBtn.addEventListener('click', prevSlide)
      nextBtn.addEventListener('click', nextSlide)

      // Inicializar - garantir que todos os slides estejam escondidos exceto o primeiro
      slides.forEach((slide, i) => {
        if (i === 0) {
          slide.classList.add('active')
        } else {
          slide.classList.remove('active')
        }
      })
      
      updatePagination()
    }
  }
})
