<script setup lang="ts">
import GameSettings from './components/GameSettings.vue'
import QuizGame from './components/QuizGame.vue'
import ScoreBoard from './components/ScoreBoard.vue'
import { useQuizGame, type Operation } from './composables/useQuizGame'

interface GameStartSettings {
  operations: Operation[]
  digits: number
}

const {
  isPlaying,
  score,
  highScore,
  totalAnswered,
  correctAnswers,
  selectedOperations,
  digitLevel,
  num1,
  num2,
  operation,
  showResult,
  isCorrect,
  correctAnswer,
  startGame,
  endGame,
  checkAnswer,
  nextQuestion
} = useQuizGame()

const handleStart = (settings: GameStartSettings): void => {
  selectedOperations.value = settings.operations
  digitLevel.value = settings.digits
  startGame()
}

const handleCheck = (answer: number): void => {
  checkAnswer(answer)
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-8 px-4">
    <!-- Animated Background -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div class="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
    </div>
    
    <div class="relative z-10 max-w-2xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-2">
          🧮 Math Quiz
        </h1>
        <p class="text-white/60">Latihan Matematika Interaktif</p>
      </div>
      
      <!-- Score Board (show when playing) -->
      <ScoreBoard 
        v-if="isPlaying"
        :score="score"
        :high-score="highScore"
        :total-answered="totalAnswered"
        :correct-answers="correctAnswers"
      />
      
      <!-- High Score Display (show on home) -->
      <div v-if="!isPlaying && highScore > 0" class="text-center mb-6">
        <div class="inline-block bg-white/10 backdrop-blur-lg rounded-xl px-6 py-3 border border-white/20">
          <span class="text-white/70">🏆 Skor Tertinggi: </span>
          <span class="text-2xl font-bold text-yellow-400">{{ highScore }}</span>
        </div>
      </div>
      
      <!-- Game Settings (show when not playing) -->
      <GameSettings 
        v-if="!isPlaying"
        @start="handleStart"
      />
      
      <!-- Quiz Game (show when playing) -->
      <QuizGame 
        v-if="isPlaying"
        :num1="num1"
        :num2="num2"
        :operation="operation"
        :show-result="showResult"
        :is-correct="isCorrect"
        :correct-answer="correctAnswer"
        @check="handleCheck"
        @next="nextQuestion"
        @end="endGame"
      />
    </div>
  </div>
</template>

<style>
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
