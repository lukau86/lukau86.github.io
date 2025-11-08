document.body.insertAdjacentHTML('afterbegin', `<div id="important">Najkoristnejši prostor v hiši je sekret. Zares lepo je samo tisto, kar ne služi ničemur; vse, kar je koristno, je grdo, ker je izraz določene potrebe, človekove potrebe pa so prostaške in odvratne tako kot njegova bolna narava.</div>`);

const h1 = document.querySelector('h1');
let rect = h1.getBoundingClientRect();
let last = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
let ticking = false;

function scheduleUpdate(e) {
    if (e) {
        last.x = e.clientX ?? e.x ?? last.x;
        last.y = e.clientY ?? e.y ?? last.y;
    }
    if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
            rect = h1.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            let xdiff = last.x - cx;
            let ydiff = last.y - cy;
            const dist = Math.hypot(xdiff, ydiff) || 1;
            const xoff = xdiff * 10 / (dist+100/dist);
            const yoff = ydiff * 10 / (dist+100/dist);
            h1.style.textShadow = `${xoff}px ${yoff}px 4px bisque`;
            ticking = false;
        });
    }
}

window.addEventListener('mousemove', scheduleUpdate, { passive: true });
window.addEventListener('resize', () => (rect = h1.getBoundingClientRect()));
window.addEventListener('scroll', () => (rect = h1.getBoundingClientRect()), { passive: true });