/* ===== Variables and Constants ===== */
const scrollThreshold = 100;
const animationDelay = 200;
const fadeInOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

/* ===== DOM Elements ===== */
const header = document.querySelector('header');
const burger = document.querySelector('.burger');
const nav = document.querySelector('nav');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');
const imageItems = document.querySelectorAll('.body004 .image-item');
const instagramGrid = document.querySelector('.instagram-grid');
const menuIcon = document.querySelector('.menu-icon');
const menuOverlay = document.querySelector('.menu-overlay');
const dropdowns = document.querySelectorAll('.dropdown');
const hero = document.querySelector('.hero');

const instagramPosts = [
    'https://www.instagram.com/p/C4QZQYvPJ7H/embed',
    'https://www.instagram.com/p/C4QZQYvPJ7H/embed',
    'https://www.instagram.com/p/C4QZQYvPJ7H/embed'
];

/* ===== Functions ===== */
function handleScroll() {
    if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

function toggleNav() {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
}

function closeNavOnClick() {
    nav.classList.remove('nav-active');
    burger.classList.remove('toggle');
}

function handleImageAnimation(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}

function loadInstagramPosts() {
    if (!instagramGrid) return;
    
    instagramPosts.forEach((postUrl, index) => {
        const blockquote = document.createElement('blockquote');
        blockquote.className = 'instagram-media';
        blockquote.setAttribute('data-instgrm-permalink', postUrl);
        blockquote.setAttribute('data-instgrm-version', '14');
        instagramGrid.appendChild(blockquote);
    });
}

function initializeInstagram() {
    if (window.instgrm) {
        window.instgrm.Embeds.process();
    }
}

function handleDropdownClick(e) {
    if (window.innerWidth <= 768) {
        e.preventDefault();
        const dropdown = e.currentTarget;
        dropdown.classList.toggle('active');
    }
}

function handleHeaderScroll() {
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    if (window.scrollY > heroBottom) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

/* ===== Event Listeners ===== */
window.addEventListener('scroll', handleScroll);
window.addEventListener('scroll', handleHeaderScroll);

burger.addEventListener('click', toggleNav);

navLinksItems.forEach(link => {
    link.addEventListener('click', closeNavOnClick);
});

/* ===== Intersection Observer ===== */
const fadeInObserver = new IntersectionObserver(handleImageAnimation, fadeInOptions);
imageItems.forEach(item => fadeInObserver.observe(item));

dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', handleDropdownClick);
});

/* ===== Mobile Menu Event Listeners ===== */
menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('active');
    navLinks.classList.toggle('active');
    menuOverlay.classList.toggle('active');
});

menuOverlay.addEventListener('click', () => {
    menuIcon.classList.remove('active');
    navLinks.classList.remove('active');
    menuOverlay.classList.remove('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            menuIcon.classList.remove('active');
            navLinks.classList.remove('active');
            menuOverlay.classList.remove('active');
        }
    });
});

/* ===== Initialization ===== */
document.addEventListener('DOMContentLoaded', () => {
    loadInstagramPosts();
    initializeInstagram();
});
