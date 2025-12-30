// Auto-play background music
document.addEventListener('DOMContentLoaded', function () {
    const backgroundMusic = document.getElementById('backgroundMusic');

    if (backgroundMusic) {
        // Try to auto-play
        backgroundMusic.play().catch(err => {
            console.log('Auto-play blocked, will play on first user interaction:', err);

            // If auto-play is blocked, play on first user interaction
            const playOnInteraction = () => {
                backgroundMusic.play().catch(e => console.log('Play failed:', e));
            };

            document.addEventListener('click', playOnInteraction, { once: true });
            document.addEventListener('touchstart', playOnInteraction, { once: true });
        });
    }

    // Wax Seal Click Handler
    const waxSeal = document.getElementById('waxSeal');

    // Add click event listener to wax seal
    waxSeal.addEventListener('click', function (e) {
        // Prevent default behavior and stop propagation
        e.preventDefault();
        e.stopPropagation();

        // Save music time before navigation
        if (backgroundMusic && !backgroundMusic.paused) {
            localStorage.setItem('musicTime', backgroundMusic.currentTime.toString());
            localStorage.setItem('musicPlaying', 'true');
        }

        // Add breaking animation
        this.style.animation = 'break 0.6s ease-out forwards';

        // Navigate to page 2 after animation
        setTimeout(() => {
            window.location.href = 'page2.html';
        }, 600);
    });

    // Hover effects removed to prevent movement
});

// Breaking animation for wax seal
const style = document.createElement('style');
style.textContent = `
    @keyframes break {
        0% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.2) rotate(5deg);
            opacity: 0.8;
        }
        100% {
            transform: translate(-50%, -50%) scale(0.5) rotate(15deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add particle effect on click (optional enhancement)
waxSeal.addEventListener('click', function (e) {
    createParticles(e.clientX, e.clientY);
});

function createParticles(x, y) {
    const particleCount = 12;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: #8b7355;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${x}px;
            top: ${y}px;
        `;

        document.body.appendChild(particle);

        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 3 + Math.random() * 2;
        const tx = Math.cos(angle) * velocity * 20;
        const ty = Math.sin(angle) * velocity * 20;

        particle.animate([
            { transform: 'translate(0, 0)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px)`, opacity: 0 }
        ], {
            duration: 600,
            easing: 'cubic-bezier(0, .9, .57, 1)'
        }).onfinish = () => particle.remove();
    }
}

// Prevent default touch behaviors for better mobile experience
document.addEventListener('touchstart', function (e) {
    if (e.target.closest('#waxSeal')) {
        e.preventDefault();
    }
}, { passive: false });
