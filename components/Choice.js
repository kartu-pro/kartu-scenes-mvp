export default {
    props: ['options', 'answer'],
    mounted() {
        window.addEventListener('keydown', this.handleKey);
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.handleKey);
    },
    methods: {
        handleKey(e) {
            const num = parseInt(e.key);
            if (num > 0 && num <= this.options.length) {
                this.$emit('submit', this.options[num - 1]);
            }
        }
    },
    template: `
        <div class="grid grid-cols-1 gap-3 w-full animate-in fade-in zoom-in duration-200">
            <button v-for="(opt, i) in options" @click="$emit('submit', opt)"
                class="group w-full p-4 text-left border-2 border-slate-200 rounded-2xl font-bold text-slate-700 hover:border-blue-400 active:scale-[0.98] transition-all flex items-center">
                <span class="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 text-slate-500 mr-4 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors text-sm">
                    {{i + 1}}
                </span>
                <span class="text-xl leading-none">{{opt}}</span>
            </button>
        </div>
    `
};
