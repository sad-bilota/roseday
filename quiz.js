// Quiz Logic with smooth transitions
let currentQuestion = 1;

// Get all option buttons
const optionButtons = document.querySelectorAll('.option-btn');

// Add click event listeners to all option buttons
optionButtons.forEach(button => {
    button.addEventListener('click', function() {
        const questionNum = this.getAttribute('data-question');
        const answer = this.getAttribute('data-answer');
        
        // Disable all buttons in current question
        const currentButtons = document.querySelectorAll(`[data-question="${questionNum}"]`);
        currentButtons.forEach(btn => btn.style.pointerEvents = 'none');
        
        // Add selected class
        this.classList.add('selected');
        
        // Handle answer based on question
        handleAnswer(questionNum, answer);
    });
});

function handleAnswer(questionNum, answer) {
    const feedbackElement = document.getElementById(`feedback${questionNum}`);
    
    if (questionNum === '1') {
        // Question 1 - Any answer is acceptable
        feedbackElement.textContent = answer === 'a' ? 'Great choice! ❤️' : 'Nice! 😊';
        feedbackElement.classList.add('show', 'correct');
        
        // Move to next question after 2 seconds
        setTimeout(() => {
            transitionToQuestion(2);
        }, 2000);
        
    } else if (questionNum === '2') {
        // Question 2 - Any answer is acceptable
        feedbackElement.textContent = answer === 'a' ? 'Aww, I love you too! 💕' : 'That\'s sweet! 💖';
        feedbackElement.classList.add('show', 'correct');
        
        // Move to next question after 2 seconds
        setTimeout(() => {
            transitionToQuestion(3);
        }, 2000);
        
    } else if (questionNum === '3') {
        // Question 3 - Must select 'a' (Daddy)
        if (answer === 'a') {
            feedbackElement.textContent = 'Good girl, sweetie! ❤️';
            feedbackElement.classList.add('show', 'correct');
            
            // Show continue button after 1.5 seconds
            setTimeout(() => {
                showContinueButton();
            }, 1500);
        } else {
            feedbackElement.textContent = 'No babe, wrong option! Try again. 😤';
            feedbackElement.classList.add('show', 'wrong');
            
            // Re-enable buttons after animation
            setTimeout(() => {
                const currentButtons = document.querySelectorAll(`[data-question="3"]`);
                currentButtons.forEach(btn => {
                    btn.style.pointerEvents = 'auto';
                    btn.classList.remove('selected');
                });
                feedbackElement.classList.remove('show', 'wrong');
                feedbackElement.textContent = '';
            }, 2000);
        }
    }
}

function transitionToQuestion(nextQuestionNum) {
    const currentQuestionElement = document.getElementById(`question${currentQuestion}`);
    const nextQuestionElement = document.getElementById(`question${nextQuestionNum}`);
    
    // Fade out current question
    currentQuestionElement.classList.add('fade-out');
    
    setTimeout(() => {
        currentQuestionElement.classList.add('hidden');
        currentQuestionElement.classList.remove('fade-out');
        
        // Show next question
        nextQuestionElement.classList.remove('hidden');
        
        // Update current question number
        currentQuestion = nextQuestionNum;
    }, 500);
}

function showContinueButton() {
    const continueBtn = document.getElementById('continueBtn');
    continueBtn.classList.remove('hidden');
    
    // Trigger animation
    setTimeout(() => {
        continueBtn.classList.add('show');
    }, 100);
}

// Add touch support for mobile devices on rose page
if (window.location.pathname.includes('rose.html')) {
    const rose = document.querySelector('.rose');
    if (rose) {
        rose.addEventListener('click', function() {
            this.classList.add('active');
        });
        
        rose.addEventListener('touchstart', function() {
            this.classList.add('active');
        });
    }
}