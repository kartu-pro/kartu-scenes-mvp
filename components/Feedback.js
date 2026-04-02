export default {
    props: ['feedback', 'answer'],
    template: `
    <div class="w-full max-h-full p-6 rounded-[2rem] border-2 flex flex-col items-center text-center shadow-sm overflow-hidden"
        :class="{
            'bg-emerald-50 border-emerald-100': feedback.isCorrect,
            'bg-amber-50 border-amber-200': !feedback.isCorrect && !feedback.isTooMessy,
            'bg-slate-50 border-slate-200': feedback.isTooMessy
    }">
        <h3 class="font-black uppercase tracking-widest text-[10px] mb-4 shrink-0" :class="feedback.isCorrect ? 'text-emerald-600' : 'text-slate-500'">
            {{feedback.message}}
        </h3>

        <!-- SCROLLABLE CONTENT AREA -->
        <div class="flex-1 w-full overflow-y-auto mb-6 flex flex-col justify-center py-2">
            <template v-if="!feedback.isCorrect">
                <div v-if="feedback.isTooMessy" class="flex flex-col items-center gap-2">
                    <span class="text-lg text-red-400 line-through opacity-60 break-all">{{feedback.userAttempt}}</span>
                    <div class="text-slate-300">⬇️</div>
                    <span class="text-2xl font-bold text-slate-800 break-all">{{answer}}</span>
                </div>
                <div v-else class="flex flex-wrap justify-center items-baseline gap-x-0.5 leading-loose">
                    <span v-for="seg in feedback.diff" class="diff-char" :class="'diff-' + seg.type">{{seg.char}}</span>
                </div>
            </template>
            <template v-else>
                <span class="text-3xl font-bold text-emerald-700">{{answer}}</span>
            </template>
        </div>

        <button @click="$emit('continue')" class="group flex items-center gap-3 bg-white px-10 py-4 rounded-2xl shadow-sm border border-slate-200 font-bold text-slate-600 hover:border-blue-400 active:scale-95 transition-all shrink-0">
            <span>CONTINUE</span>
            <kbd class="hidden sm:inline-block px-1.5 py-0.5 rounded border border-slate-200 text-[10px] bg-slate-50">ENTER</kbd>
        </button>
    </div>`
};
