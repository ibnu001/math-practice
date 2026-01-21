<script setup lang="ts">
interface Props {
  score: number
  highScore: number
  totalAnswered: number
  correctAnswers: number
}

defineProps<Props>()
</script>

<template>
  <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <!-- Current Score -->
      <div class="text-center">
        <div class="text-3xl md:text-4xl font-bold text-yellow-400 drop-shadow-lg">
          {{ score }}
        </div>
        <div class="text-sm text-white/70 mt-1">Skor</div>
      </div>
      
      <!-- High Score -->
      <div class="text-center">
        <div class="text-3xl md:text-4xl font-bold text-purple-400 drop-shadow-lg">
          {{ highScore }}
        </div>
        <div class="text-sm text-white/70 mt-1">Skor Tertinggi</div>
      </div>
      
      <!-- Total Answered -->
      <div class="text-center">
        <div class="text-3xl md:text-4xl font-bold text-cyan-400 drop-shadow-lg">
          {{ totalAnswered }}
        </div>
        <div class="text-sm text-white/70 mt-1">Total Soal</div>
      </div>
      
      <!-- Accuracy -->
      <div class="text-center">
        <div class="text-3xl md:text-4xl font-bold text-green-400 drop-shadow-lg">
          {{ totalAnswered > 0 ? Math.round((correctAnswers / totalAnswered) * 100) : 0 }}%
        </div>
        <div class="text-sm text-white/70 mt-1">Akurasi</div>
      </div>
    </div>
  </div>
</template>
