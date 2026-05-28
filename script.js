/**
 * Portfolio Interactive Script
 * Contient le défilement fluide, le suivi de section (ScrollSpy), le filtrage des projets et la mini-galerie.
 */

/**
 * Permet de remplacer l'image principale d'un projet par une autre au clic d'une miniature
 * avec un effet de fondu progressif très fluide.
 */
function swapProjectImage(mainImageId, newSrc, thumbnailElement) {
    const mainImg = document.getElementById(mainImageId);
    if (!mainImg) return;
    
    // Effet de fondu en réduisant l'opacité
    mainImg.style.opacity = '0.3';
    
    setTimeout(() => {
        mainImg.src = newSrc;
        // Rétablissement de l'opacité après chargement de la nouvelle source
        mainImg.style.opacity = '1';
    }, 120);
    
    // Gestion de la classe active sur les miniatures
    const thumbnails = thumbnailElement.parentElement.querySelectorAll('.gallery-thumbnail');
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    thumbnailElement.classList.add('active');
}


document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. DÉFILEMENT FLUIDE (SMOOTH SCROLL)
       ========================================================================== */
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Met à jour l'URL sans saut brutal dans la page
                history.pushState(null, null, targetId);
            }
        });
    });

    /* ==========================================================================
       2. SUIVI DE LA NAVIGATION AU DÉFILEMENT (SCROLLSPY)
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    
    const highlightNav = () => {
        let scrollPosition = window.scrollY || document.documentElement.scrollTop;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 180; // Décale pour correspondre au visuel
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    // Écouteur de défilement avec optimisation simple
    window.addEventListener('scroll', highlightNav);
    highlightNav(); // Appel initial pour surligner au chargement de la page

    /* ==========================================================================
       3. SYSTÈME DE FILTRAGE DES PROJETS
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 1. Mettre à jour le bouton actif
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // 2. Filtrer et animer les cartes de projets
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    // Réaffiche la carte
                    card.style.display = 'flex';
                    // Petit délai pour laisser le navigateur réinjecter le display avant la transition d'opacité
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 20);
                } else {
                    // Cache la carte avec une transition de fondu/réduction
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300); // Doit correspondre à la durée de la transition CSS
                }
            });
        });
    });
});
