export default {
    props: ['current', 'total', 'canPrev', 'canNext'],
    template: `
    <header class="px-6 py-2 border-b shrink-0 bg-white">
        <div class="flex items-center justify-between">
            <button @click="$emit('prev')" :class="{'opacity-0 pointer-events-none': !canPrev}" class="p-2 text-slate-400 hover:text-blue-500 transition-all">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
            </button>
            
            <div class="flex-1 px-4 text-center">
                <span class="text-sm font-black text-slate-500 tracking-widest uppercase">{{current}} / {{total}}</span>
                <div class="h-1.5 w-full bg-slate-100 rounded-full mt-1 overflow-hidden">
                    <div class="h-full bg-blue-500 transition-all duration-500" :style="{width: (current/total)*100 + '%'}"></div>
                </div>
            </div>

            <button @click="$emit('next')" :class="{'opacity-0 pointer-events-none': !canNext}" class="p-2 text-slate-400 hover:text-blue-500 transition-all">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
            </button>
        </div>
    </header>`
};
