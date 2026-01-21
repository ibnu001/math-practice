<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import type { Operation } from '../composables/useQuizGame'
import NumberKeypad from './NumberKeypad.vue'

interface Props {
  num1: number
  num2: number
  operation: Operation
  showResult: boolean
  isCorrect: boolean
  correctAnswer: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  check: [answer: number]
  next: []
  end: []
}>()

const userAnswer = ref('')
const inputRef = ref<HTMLInputElement | null>(null)
const justChecked = ref(false) // Flag to prevent double Enter
const showKeypad = ref(false) // Toggle for custom keypad

const handleSubmit = (): void => {
  if (props.showResult) {
    emit('next')
    userAnswer.value = ''
    nextTick(() => {
      inputRef.value?.focus()
    })
  } else if (userAnswer.value !== '') {
    emit('check', parseFloat(userAnswer.value))
    justChecked.value = true
    // Reset flag after a short delay
    setTimeout(() => {
      justChecked.value = false
    }, 100)
  }
}

const handleKeydown = (e: KeyboardEvent): void => {
  if (e.key === 'Enter') {
    e.preventDefault()
    handleSubmit()
  }
}

// Global keyboard listener for Enter after result
const handleGlobalKeydown = (e: KeyboardEvent): void => {
  if (e.key === 'Enter' && props.showResult && !justChecked.value) {
    e.preventDefault()
    handleSubmit()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleGlobalKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleGlobalKeydown)
})

// Focus input when mounted (only if keypad is hidden)
watch(() => props.num1, () => {
  if (!showKeypad.value) {
    nextTick(() => {
      inputRef.value?.focus()
    })
  }
}, { immediate: true })
</script>

<template>
  <div class="bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 border border-white/20">
    <!-- Question Display -->
    <div class="text-center mb-6 md:mb-8">
      <div 
        class="text-3xl md:text-6xl font-bold text-white mb-4 transition-all duration-300"
        :class="{ 'animate-pulse': showResult && isCorrect }"
      >
        <span class="text-cyan-300">{{ num1 }}</span>
        <span class="text-yellow-400 mx-2 md:mx-4">{{ operation }}</span>
        <span class="text-pink-300">{{ num2 }}</span>
        <span class="text-white/70 mx-2 md:mx-4">=</span>
        <span class="text-green-400">?</span>
      </div>
    </div>
    
    <!-- Answer Input -->
    <div class="max-w-xs mx-auto mb-4">
      <input
        ref="inputRef"
        v-model="userAnswer"
        :type="showKeypad ? 'text' : 'number'"
        :readonly="showKeypad"
        :disabled="showResult"
        :inputmode="showKeypad ? 'none' : 'numeric'"
        @keydown="handleKeydown"
        placeholder="Jawaban..."
        class="w-full px-6 py-4 text-2xl text-center font-bold rounded-xl 
               bg-white/20 border-2 border-white/30 text-white placeholder-white/40
               focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/30
               transition-all duration-300 disabled:opacity-50"
      />
    </div>

    <!-- Toggle Keypad Button -->
    <div class="text-center mb-4">
      <button
        @click="showKeypad = !showKeypad"
        class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
        :class="showKeypad 
          ? 'bg-cyan-500/30 text-cyan-300' 
          : 'bg-white/10 text-white/60 hover:bg-white/20'"
      >
        {{ showKeypad ? '⌨️ Sembunyikan Keypad' : '🔢 Tampilkan Keypad' }}
      </button>
    </div>

    <!-- Custom Number Keypad -->
    <div v-if="showKeypad" class="max-w-xs mx-auto mb-4">
      <NumberKeypad
        v-model="userAnswer"
        :disabled="showResult"
        :show-result="showResult"
        @submit="handleSubmit"
      />
    </div>
    
    <!-- Result Feedback -->
    <div v-if="showResult" class="text-center mb-4 md:mb-6 animate-bounce">
      <div 
        class="text-xl md:text-2xl font-bold py-3 px-6 rounded-xl inline-block"
        :class="isCorrect ? 'bg-green-500/30 text-green-300' : 'bg-red-500/30 text-red-300'"
      >
        <span v-if="isCorrect">🎉 Benar! +1 Poin</span>
        <span v-else>❌ Salah! Jawaban: {{ correctAnswer }}</span>
      </div>
    </div>
    
    <!-- Action Buttons -->
    <div class="flex gap-3 md:gap-4 justify-center">
      <button
        v-if="!showKeypad"
        @click="handleSubmit"
        class="px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg transition-all duration-300 transform hover:scale-105"
        :class="showResult 
          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl'
          : 'bg-gradient-to-r from-green-400 to-cyan-500 text-white shadow-lg hover:shadow-xl'"
      >
        {{ showResult ? '➡️ Lanjut' : '✓ Cek' }}
      </button>
      
      <button
        @click="$emit('end')"
        class="px-4 md:px-6 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg bg-white/10 text-white/70 
               hover:bg-red-500/30 hover:text-red-300 transition-all duration-300"
      >
        🏁 Selesai
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Hide number input arrows */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
