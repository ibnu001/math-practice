import { ref, computed, type Ref, type ComputedRef } from 'vue'

const STORAGE_KEY = 'math-quiz-high-score'

export type Operation = '+' | '-' | '×' | '÷'

export interface QuizGameState {
  isPlaying: Ref<boolean>
  score: Ref<number>
  highScore: Ref<number>
  totalAnswered: Ref<number>
  correctAnswers: Ref<number>
  selectedOperations: Ref<Operation[]>
  digitLevel: Ref<number>
  num1: Ref<number>
  num2: Ref<number>
  operation: Ref<Operation>
  userAnswer: Ref<string>
  showResult: Ref<boolean>
  isCorrect: Ref<boolean>
  correctAnswer: ComputedRef<number>
  startGame: () => void
  endGame: () => void
  checkAnswer: (answer: number) => void
  nextQuestion: () => void
  toggleOperation: (op: Operation) => void
}

export function useQuizGame(): QuizGameState {
  // Game state
  const isPlaying = ref(false)
  const score = ref(0)
  const highScore = ref(parseInt(localStorage.getItem(STORAGE_KEY) || '0'))
  const totalAnswered = ref(0)
  const correctAnswers = ref(0)

  // Settings
  const selectedOperations = ref<Operation[]>([])
  const digitLevel = ref(1)

  // Current question
  const num1 = ref(0)
  const num2 = ref(0)
  const operation = ref<Operation>('+')
  const userAnswer = ref('')
  const showResult = ref(false)
  const isCorrect = ref(false)

  // Generate random number based on digit level
  const generateNumber = (digits: number): number => {
    const min = digits === 1 ? 1 : Math.pow(10, digits - 1)
    const max = Math.pow(10, digits) - 1
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  // Calculate correct answer
  const correctAnswer = computed((): number => {
    switch (operation.value) {
      case '+':
        return num1.value + num2.value
      case '-':
        return num1.value - num2.value
      case '×':
        return num1.value * num2.value
      case '÷':
        return num1.value / num2.value
      default:
        return 0
    }
  })

  // Generate new question
  const generateQuestion = (): void => {
    // Random operation from selected
    const ops = selectedOperations.value
    operation.value = ops[Math.floor(Math.random() * ops.length)]

    // Generate numbers based on digit level
    num1.value = generateNumber(digitLevel.value)
    num2.value = generateNumber(digitLevel.value)

    // Special handling for subtraction (ensure positive result)
    if (operation.value === '-' && num2.value > num1.value) {
      [num1.value, num2.value] = [num2.value, num1.value]
    }

    // Special handling for division (ensure clean division)
    if (operation.value === '÷') {
      // Make num1 a multiple of num2
      num1.value = num2.value * generateNumber(digitLevel.value)
    }

    userAnswer.value = ''
    showResult.value = false
  }

  // Check answer
  const checkAnswer = (answer: number): void => {
    if (answer === undefined || answer === null || isNaN(answer)) return

    userAnswer.value = String(answer)
    isCorrect.value = answer === correctAnswer.value
    showResult.value = true
    totalAnswered.value++

    if (isCorrect.value) {
      score.value++
      correctAnswers.value++

      // Update high score
      if (score.value > highScore.value) {
        highScore.value = score.value
        localStorage.setItem(STORAGE_KEY, highScore.value.toString())
      }
    }
  }

  // Next question
  const nextQuestion = (): void => {
    generateQuestion()
  }

  // Start game
  const startGame = (): void => {
    score.value = 0
    totalAnswered.value = 0
    correctAnswers.value = 0
    isPlaying.value = true
    generateQuestion()
  }

  // End game
  const endGame = (): void => {
    isPlaying.value = false
  }

  // Toggle operation
  const toggleOperation = (op: Operation): void => {
    const index = selectedOperations.value.indexOf(op)
    if (index > -1) {
      selectedOperations.value.splice(index, 1)
    } else {
      selectedOperations.value.push(op)
    }
  }

  return {
    // State
    isPlaying,
    score,
    highScore,
    totalAnswered,
    correctAnswers,

    // Settings
    selectedOperations,
    digitLevel,

    // Question
    num1,
    num2,
    operation,
    userAnswer,
    showResult,
    isCorrect,
    correctAnswer,

    // Methods
    startGame,
    endGame,
    checkAnswer,
    nextQuestion,
    toggleOperation
  }
}
