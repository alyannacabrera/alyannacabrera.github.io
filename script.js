const pupils = document.querySelectorAll(".eye .pupil");
window.addEventListener("mousemove", (e) => {
  pupils.forEach((pupil) => {
    // get x and y postion of cursor
    var rect = pupil.getBoundingClientRect();
    var x = (e.pageX - rect.left) / 30 + "px";
    var y = (e.pageY - rect.top) / 30 + "px";
    pupil.style.transform = "translate3d(" + x + "," + y + ", 0px)";
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Typing effect
  const headlineElement = document.querySelector('.headline');
            if (!headlineElement) return;

            // Define the phrases as plain text
            const phrases = [
                { text: 'Fail early.' },
                { text: 'Learn faster.' },
                { text: 'Win always.' }
            ];

            let phraseIndex = 0;      // Current main phrase index
            let charIndex = 0;        // Current character index within the current phrase's plain text
            let isDeleting = false;   // Flag to indicate if text is being erased

            // Speeds (milliseconds)
            const typingSpeed = 80;
            const erasingSpeed = 50;
            const pauseAfterType = 1500; // Pause after typing a phrase
            const pauseAfterErase = 500; // Pause after erasing a phrase

            // Create cursor element once and reuse it
            const cursorElement = document.createElement('span');
            cursorElement.classList.add('typing-cursor');

            headlineElement.innerHTML = ''; // Clear initial content to prepare for typing

            function typeErase() {
                const currentPhraseData = phrases[phraseIndex];
                const currentText = currentPhraseData.text;

                let displayContent = ''; // The plain text content to display

                if (!isDeleting) { // Typing logic
                    if (charIndex < currentText.length) {
                        // Type one character
                        displayContent = currentText.substring(0, charIndex + 1);
                        charIndex++;
                        setTimeout(typeErase, typingSpeed);
                    } else {
                        // Current phrase is fully typed
                        isDeleting = true;
                        setTimeout(typeErase, pauseAfterType); // Pause before starting erase
                        return; // Exit to prevent immediate erasing
                    }
                } else { // Erasing logic
                    if (charIndex > 0) {
                        // Erase one character
                        displayContent = currentText.substring(0, charIndex - 1);
                        charIndex--;
                        setTimeout(typeErase, erasingSpeed);
                    } else {
                        // Current phrase is fully erased
                        isDeleting = false;
                        phraseIndex = (phraseIndex + 1) % phrases.length; // Move to next main phrase, loop if at end
                        setTimeout(typeErase, pauseAfterErase); // Pause before typing next phrase
                        return; // Exit to prevent immediate typing
                    }
                }

                // Apply the gradient class to the entire currently displayed text
                let htmlToDisplay = '';
                if (displayContent.length > 0 || (isDeleting && charIndex > 0)) {
                    htmlToDisplay = `<span class="gradient-text">${displayContent}</span>`;
                }

                headlineElement.innerHTML = htmlToDisplay + cursorElement.outerHTML;

                // If the content is completely empty and not deleting, just show the cursor
                if (htmlToDisplay === '' && !isDeleting && charIndex === 0) {
                    headlineElement.innerHTML = cursorElement.outerHTML;
                }
            }

            typeErase(); // Start the typing/erasing effect
  // Logo hover effect
  const logos = document.querySelectorAll('.logo-grid .logo');
  const ink = document.querySelector('.background-spread');
  const body = document.body;
  const defaultColor = '#0f0f0f';

  let resetTimeout;
  let activeColor = null;

  logos.forEach(logo => {
    const color = logo.getAttribute('data-color');

    logo.addEventListener('mouseenter', (e) => {
      // Clear pending reset
      clearTimeout(resetTimeout);

      activeColor = color; // Store current color

      // Get center position of logo
      const rect = logo.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      // Setup and trigger animation
      ink.style.left = `${x - 50}px`;
      ink.style.top = `${y - 50}px`;
      ink.style.backgroundColor = color;
      ink.style.transition = 'none';
      ink.style.transform = 'scale(0)';
      ink.style.opacity = '1';

      requestAnimationFrame(() => {
        ink.style.transition = 'transform 0.8s ease-out, opacity 0.5s ease';
        ink.style.transform = 'scale(30)';
      });

      // Apply background after animation starts
      setTimeout(() => {
        if (activeColor === color) {
          body.style.backgroundColor = color;
        }
      }, 300);
    });

    logo.addEventListener('mouseleave', () => {
      // Start fade-out animation
      ink.style.opacity = '0';

      // Schedule background reset only if not re-hovered
      resetTimeout = setTimeout(() => {
        if (activeColor === color) {
          body.style.backgroundColor = defaultColor;
          ink.style.transform = 'scale(0)';
          activeColor = null;
        }
      }, 300); // Match fade-out duration
    });
  });
});
