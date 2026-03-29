document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.benefits-card');

    if (!cards.length) return;

    const options = {
        root: null,
        threshold: 0.4
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animation-cards');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    cards.forEach(card => observer.observe(card));
});