export default {
    data() { return { val: '' } },
    mounted() {
        // Auto-focus the input only on desktop (width > 768px) after the component renders
        setTimeout(() => {
            if (window.innerWidth > 768) {
                this.$refs.answerInput?.focus();
            }
        }, 200);
    },
    methods: {
        handleBlur() {
            // Trigger check on blur only if user has actually typed something
            if (this.val.trim().length > 0) {
                this.$emit('submit', this.val);
            }
        }
    },
    template: `
        <div class="w-full px-2 animate-in fade-in zoom-in duration-200">
            <input 
                ref="answerInput"
                v-model="val" 
                @keyup.enter.prevent.stop="$emit('submit', val)"
                @blur="handleBlur"
                type="text" 
                placeholder="პასუხი..." 
                class="w-full p-4 border-b-4 border-blue-500 bg-slate-50 rounded-t-2xl text-center text-2xl font-bold focus:outline-none">
            
            <!-- Updated text to be more inclusive of mobile -->
            <p class="text-center text-[10px] text-slate-400 mt-4 uppercase font-black tracking-widest">
                Press Enter or tap away to check
            </p>
        </div>
    `
};
