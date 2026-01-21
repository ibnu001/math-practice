<script setup lang="ts">
import { ref } from 'vue'
import type { Operation } from '../composables/useQuizGame'

interface OperationItem {
  symbol: Operation
  name: string
  color: string
}

interface DigitLevel {
  value: number
  label: string
  example: string
}

interface GameStartSettings {
  operations: Operation[]
  digits: number
}

const emit = defineEmits<{
  start: [settings: GameStartSettings]
}>()

const selectedOperations = ref<Operation[]>([])
const digitLevel = ref(1)

const operations: OperationItem[] = [
  { symbol: '+', name: 'Penjumlahan', color: 'bg-green-500' },
  { symbol: '-', name: 'Pengurangan', color: 'bg-red-500' },
  { symbol: '×', name: 'Perkalian', color: 'bg-blue-500' },
  { symbol: '÷', name: 'Pembagian', color: 'bg-purple-500' }
]

const digitLevels: DigitLevel[] = [
  { value: 1, label: '1 Digit', example: '5 + 3' },
  { value: 2, label: '2 Digit', example: '25 + 13' },
  { value: 3, label: '3 Digit', example: '125 + 234' }
]

const toggleOperation = (op: Operation): void => {
  const index = selectedOperations.value.indexOf(op)
  if (index > -1) {
    selectedOperations.value.splice(index, 1)
  } else {
    selectedOperations.value.push(op)
  }
}

const startGame = (): void => {
  emit('start', {
    operations: selectedOperations.value,
    digits: digitLevel.value
  })
}
</script>

<template>
  <div class="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 max-w-lg mx-auto">
    <h2 class="text-2xl font-bold text-white text-center mb-8">Pengaturan Game</h2>
    
    <!-- Operation Selection -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold text-white/90 mb-4">Pilih Operasi</h3>
      <div class="grid grid-cols-2 gap-3">
        <button
          v-for="op in operations"
          :key="op.symbol"
          @click="toggleOperation(op.symbol)"
          :class="[
            'p-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105',
            selectedOperations.includes(op.symbol)
              ? `${op.color} text-white shadow-lg`
              : 'bg-white/10 text-white/50 hover:bg-white/20'
          ]"
        >
          <span class="text-2xl">{{ op.symbol }}</span>
          <span class="block text-sm mt-1">{{ op.name }}</span>
        </button>
      </div>
    </div>
    
    <!-- Digit Level Selection -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold text-white/90 mb-4">Pilih Level Digit</h3>
      <div class="flex flex-wrap gap-3">
        <button
          v-for="level in digitLevels"
          :key="level.value"
          @click="digitLevel = level.value"
          :class="[
            'flex-1 p-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105',
            digitLevel === level.value
              ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg'
              : 'bg-white/10 text-white/70 hover:bg-white/20'
          ]"
        >
          <span class="block text-lg">{{ level.label }}</span>
          <span class="block text-xs mt-1 opacity-70">{{ level.example }}</span>
        </button>
      </div>
    </div>
    
    <!-- Start Button -->
    <button
      @click="startGame"
      :disabled="selectedOperations.length === 0"
      class="w-full py-4 rounded-xl bg-gradient-to-r from-green-400 to-cyan-500 text-white font-bold text-xl 
             shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300
             hover:from-green-500 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
    >
      {{ selectedOperations.length === 0 ? '⚠️ Pilih Minimal 1 Operasi' : '🚀 Mulai Game' }}
    </button>
  </div>
</template>
