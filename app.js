import QuizNav from './components/Nav.js';
import QuizFeedback from './components/Feedback.js';
import McInteraction from './components/Choice.js';
import ScrambleInteraction from './components/Scramble.js';
import TypeInteraction from './components/Type.js';
import { getLcsDiff } from './utils/diff.js';

const { createApp } = Vue;

createApp({
    components: { 
        QuizNav, 
        QuizFeedback, 
        'mc-interaction': McInteraction, 
        'scramble-interaction': ScrambleInteraction, 
        'type-interaction': TypeInteraction 
    },
    data() {
        return {
            questions: quizData,
            currentIndex: 0,
            showHint: false,
            feedback: null,
            isChecking: false
        }
    },
    computed: {
        current() { return this.questions[this.currentIndex]; }
    },
    mounted() {
			window.addEventListener('keydown', (e) => {
					// Only advance if we are currently looking at feedback
					if (e.key === 'Enter' && this.isChecking) {
							this.next();
					}
			});
    },
    methods: {
        handleSubmission(input) {
						if (this.isChecking) return; // Prevent double-submissions

            const expected = this.current.answer;
            const attempt = input.trim();
            
            if (attempt === expected) {
                this.feedback = { isCorrect: true, message: 'Excellent!' };
            } else {
                const diffData = getLcsDiff(input.trim(), this.current.answer);
                const editCount = diffData.filter(d => d.type !== 'match').length;
                
                this.feedback = { 
                    isCorrect: false, 
                    message: editCount > 3 ? 'Not quite.' : 'So close!',
                    isTooMessy: editCount > 3,
                    userAttempt: attempt,
                    diff: diffData
                };
            }
            this.isChecking = true;
        },
        next() {
            if (this.currentIndex < this.questions.length - 1) {
                this.currentIndex++;
                this.resetState();
            }
        },
        prev() {
            if (this.currentIndex > 0) {
                this.currentIndex--;
                this.resetState();
            }
        },
        resetState() {
            this.isChecking = false;
            this.feedback = null;
            this.showHint = false;
        }
    }
}).mount('#app');
