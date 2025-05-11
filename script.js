document.addEventListener('DOMContentLoaded', () => {
     //menu hamburguesa
     const navToggleBtn = document.getElementById('nav-toggle'); 
     const mainNav = document.getElementById('main-nav'); // Tu <nav>
     
     if (navToggleBtn && mainNav) {
         const hamburgerIcon = navToggleBtn.querySelector('.header__nav-toggle-icon--hamburger');
         const closeIcon = navToggleBtn.querySelector('.header__nav-toggle-icon--close');
 
         if (hamburgerIcon && closeIcon) {
             navToggleBtn.addEventListener('click', () => {
                 // Alternar la clase 'is-active' en el <nav> para mostrar/ocultar el menú
                 mainNav.classList.toggle('is-active');
 
                 // Alternar la visibilidad de los iconos
                 hamburgerIcon.classList.toggle('is-hidden');
                 closeIcon.classList.toggle('is-hidden');
 
                 // Actualizar el atributo aria-expanded para accesibilidad
                 const isActive = mainNav.classList.contains('is-active');
                 navToggleBtn.setAttribute('aria-expanded', isActive.toString());
 
                 // Opcional: Añadir/quitar clase al body para prevenir scroll
                 document.body.classList.toggle('nav-open', isActive);
             });
 
             // Opcional: Cerrar el menú al hacer clic en un enlace del menú
             // (útil para navegación en la misma página con anclas #)
             const navLinks = mainNav.querySelectorAll('.header__nav-link');
             navLinks.forEach(link => {
                 link.addEventListener('click', () => {
                     if (mainNav.classList.contains('is-active')) {
                         mainNav.classList.remove('is-active');
                         hamburgerIcon.classList.remove('is-hidden'); // Mostrar hamburguesa
                         closeIcon.classList.add('is-hidden');    // Ocultar cruz
                         navToggleBtn.setAttribute('aria-expanded', 'false');
                         document.body.classList.remove('nav-open');
                     }
                 });
             });
         } else {
             console.warn("Iconos de hamburguesa/cierre no encontrados dentro del botón de toggle.");
         }
     } else {
         console.warn("Botón de toggle del menú (nav-toggle) o el menú principal (main-nav) no encontrados.");
     }


    //carrusel Principal
    const carouselMain = document.querySelector('.carousel-main__container');
    if (carouselMain) {
        const slidesContainer = carouselMain.querySelector('.carousel-main__slides');
        const slides = carouselMain.querySelectorAll('.carousel-main__slide');
        const prevBtn = carouselMain.querySelector('.carousel-main__btn--prev');
        const nextBtn = carouselMain.querySelector('.carousel-main__btn--next');
        let currentIndex = 0;
        const totalSlides = slides.length;

        function updateCarouselMain() {
            slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarouselMain();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarouselMain();
        });

        
    }

    //carrusel serv
    const servicesCarousel = document.querySelector('.services__carousel');
    if (servicesCarousel) {
        const track = servicesCarousel.querySelector('.services__carousel-track');
        const cards = servicesCarousel.querySelectorAll('.service-card');
        const prevBtnSrv = servicesCarousel.querySelector('.services__carousel-btn--prev');
        const nextBtnSrv = servicesCarousel.querySelector('.services__carousel-btn--next');
        const cardStyle = window.getComputedStyle(cards[0]);
        const cardMarginRight = parseFloat(cardStyle.marginRight) || parseFloat(window.getComputedStyle(track).gap) || 0; 
        const cardWidth = cards[0].offsetWidth;
        const totalWidthToScroll = cardWidth + cardMarginRight;
        const windowWidth = servicesCarousel.querySelector('.services__carousel-window').offsetWidth;

        
        const visibleCards = Math.floor(windowWidth / totalWidthToScroll);
        let currentSrvIndex = 0;
        const totalCards = cards.length;
        
        const maxIndex = totalCards - visibleCards > 0 ? totalCards - visibleCards : 0;

        function updateServicesCarousel() {
            track.style.transform = `translateX(-${currentSrvIndex * totalWidthToScroll}px)`;
            
            prevBtnSrv.disabled = currentSrvIndex === 0;
            nextBtnSrv.disabled = currentSrvIndex >= maxIndex;
        }

         
        let resizeTimeout;
        window.addEventListener('resize', () => {
             clearTimeout(resizeTimeout);
             resizeTimeout = setTimeout(() => {
                 
                 const newWindowWidth = servicesCarousel.querySelector('.services__carousel-window').offsetWidth;
                 const newCardWidth = cards[0].offsetWidth;
                 const newCardMarginRight = parseFloat(window.getComputedStyle(cards[0]).marginRight) || parseFloat(window.getComputedStyle(track).gap) || 0;
                 const newTotalWidthToScroll = newCardWidth + newCardMarginRight;
                 const newVisibleCards = Math.floor(newWindowWidth / newTotalWidthToScroll);
                 const newMaxIndex = totalCards - newVisibleCards > 0 ? totalCards - newVisibleCards : 0;

                 
                 if (currentSrvIndex > newMaxIndex) {
                     currentSrvIndex = newMaxIndex;
                 }
                 updateServicesCarousel(); 
             }, 250); 
         });


        nextBtnSrv.addEventListener('click', () => {
            if (currentSrvIndex < maxIndex) {
                currentSrvIndex++;
                updateServicesCarousel();
            }
        });

        prevBtnSrv.addEventListener('click', () => {
            if (currentSrvIndex > 0) {
                currentSrvIndex--;
                updateServicesCarousel();
            }
        });

        updateServicesCarousel(); //estado inicial de los botones
    }

    // --- Expansión Grid Productos ---
    const loadMoreBtn = document.querySelector('.products__load-more');
    const productGrid = document.querySelector('.products__grid');
    if (loadMoreBtn && productGrid) {
        const hiddenItems = productGrid.querySelectorAll('.product-item.is-hidden');
        //cuantos mostrar cada vez 
        const itemsToShow = 3;
        let itemsCurrentlyHidden = hiddenItems.length;

        if (itemsCurrentlyHidden === 0) {
             loadMoreBtn.classList.add('is-hidden');
        }

        loadMoreBtn.addEventListener('click', () => {
            const currentlyHidden = productGrid.querySelectorAll('.product-item.is-hidden');
            let count = 0;
            currentlyHidden.forEach(item => {
                if (count < itemsToShow) {
                    item.classList.remove('is-hidden');
                    count++;
                }
            });

             //ocultar elementos ocultos
            if (productGrid.querySelectorAll('.product-item.is-hidden').length === 0) {
                loadMoreBtn.classList.add('is-hidden');
            }
        });
    }

    
     const infoIcons = document.querySelectorAll('.product-item__info-icon');
     infoIcons.forEach(icon => {
         const popup = icon.nextElementSibling;
         if (popup) {
             
             icon.addEventListener('focus', () => popup.style.opacity = '1'); //aegura visibilidad con focus
             icon.addEventListener('blur', () => popup.style.opacity = '0'); //oculta al perder focus

             
             icon.addEventListener('click', (e) => {
                  e.stopPropagation(); //evita que otros clicks se propaguen
                  const isVisible = popup.style.opacity === '1';
                  //cierra otros popups abiertos
                  document.querySelectorAll('.product-item__info-popup').forEach(p => p.style.opacity = '0');
                  popup.style.opacity = isVisible ? '0' : '1';
             });
         }
     });
     //cierra popups si se hace click fuera de ellos
     document.addEventListener('click', (e) => {
          if (!e.target.closest('.product-item__image-container')) {
               document.querySelectorAll('.product-item__info-popup').forEach(p => p.style.opacity = '0');
          }
     });


    //toggle Horario
    const scheduleToggles = document.querySelectorAll('.hours__toggle-btn');
    const scheduleDisplays = document.querySelectorAll('.hours__schedule');

    scheduleToggles.forEach(button => {
        button.addEventListener('click', () => {
            const targetScheduleId = `schedule-${button.dataset.schedule}`;

      
            scheduleToggles.forEach(btn => btn.classList.remove('is-active'));
            button.classList.add('is-active');


            scheduleDisplays.forEach(display => {
                if (display.id === targetScheduleId) {
                    display.classList.add('is-visible');
                } else {
                    display.classList.remove('is-visible');
                }
            });
        });
    });

}); 