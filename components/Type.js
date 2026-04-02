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
    template: `
        <div class="w-full px-2 animate-in fade-in zoom-in duration-200">
            <input 
                ref="answerInput"
                v-model="val" 
                @focus="$emit('focus')"
                @blur="$emit('blur')"
                @keyup.enter.prevent.stop="$emit('submit', val)"
                type="text" 
                inputmode="text"
                autocorrect="off" 
                autocapitalize="none" 
                spellcheck="false"
                autocomplete="off"
                placeholder="პასუხი..." 
                class="w-full p-4 border-b-4 border-blue-500 bg-slate-50 rounded-t-2xl text-center text-2xl font-bold focus:outline-none">
            
            <p class="text-center text-[10px] text-slate-400 mt-4 uppercase font-black tracking-widest">
                Press Enter or tap away to check
            </p>
        </div>
    `
};
