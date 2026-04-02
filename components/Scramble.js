export default {
    props: ['answer'],
    data() { return { selected: [], bank: [] } },
    mounted() { 
        this.reset();
        window.addEventListener('keydown', this.handleKey);
    },
    beforeUnmount() { window.removeEventListener('keydown', this.handleKey); },
    methods: {
        reset() {
            this.selected = [];
            this.bank = this.answer.split('').map((char, id) => ({ char, id, picked: false }));
            this.bank.sort(() => Math.random() - 0.5);
        },
        handleKey(e) {
            if (e.key === 'Backspace') {
                if (this.selected.length > 0) this.pop(this.selected.length - 1);
                return;
            }
            const match = this.bank.find(item => item.char === e.key && !item.picked);
            if (match) this.push(match);
        },
        push(item) {
            item.picked = true;
            this.selected.push(item);
            if (this.selected.length === this.bank.length) {
                this.$emit('submit', this.selected.map(s => s.char).join(''));
            }
        },
        pop(index) {
            const item = this.selected.splice(index, 1)[0];
            item.picked = false;
        }
    },
    template: `
        <div class="flex flex-col items-center w-full animate-in fade-in zoom-in duration-200">
            <div class="flex flex-wrap justify-center gap-1 mb-8 border-b-2 border-slate-100 w-full min-h-[3.5rem] px-2">
                <button v-for="(item, i) in selected" @click="pop(i)" class="text-3xl font-bold text-blue-600 px-0.5">{{item.char}}</button>
            </div>
            <div class="grid grid-cols-5 gap-3">
                <button v-for="item in bank" @click="push(item)" 
                    class="w-12 h-12 bg-white border-2 border-slate-200 rounded-xl shadow-sm font-bold text-lg transition-all"
                    :class="item.picked ? 'opacity-0 pointer-events-none' : 'active:bg-slate-100'">
                    {{item.char}}
                </button>
            </div>
        </div>
    `
};
