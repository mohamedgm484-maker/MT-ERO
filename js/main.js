/* MT ERO - Main JavaScript */

window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-screen');
    if (loader) setTimeout(() => loader.classList.add('hidden'), 1200);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.tool-card, .lang-card, .stat, .info-box, .fade-in').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

document.querySelectorAll('.code-block').forEach(block => {
    const btn = document.createElement('button');
    btn.innerHTML = 'Copy';
    btn.style.cssText = `
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
        background: rgba(0, 212, 255, 0.2);
        color: #00d4ff;
        border: 1px solid #00d4ff;
        padding: 0.3rem 0.8rem;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.75rem;
        font-weight: 600;
        transition: 0.3s;
    `;
    btn.addEventListener('click', () => {
        const code = block.querySelector('code');
        const text = code ? code.textContent : block.textContent;
        navigator.clipboard.writeText(text);
        btn.innerHTML = 'Copied';
        setTimeout(() => { btn.innerHTML = 'Copy'; }, 2000);
    });
    block.style.position = 'relative';
    block.appendChild(btn);
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        header.style.boxShadow = window.scrollY > 50 
            ? '0 5px 30px rgba(0, 212, 255, 0.2)' 
            : 'none';
    }
});

function typeEffect(element, text, speed = 40) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

window.addEventListener('load', () => {
    const subtitle = document.querySelector('.hero .subtitle');
    if (subtitle && !subtitle.dataset.typed) {
        const text = subtitle.textContent.replace('|', '');
        subtitle.dataset.typed = 'true';
        setTimeout(() => typeEffect(subtitle, text, 35), 1500);
    }
});
