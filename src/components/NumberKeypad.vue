<script setup lang="ts">
interface Props {
  modelValue: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  submit: []
}>()

const handleNumberClick = (num: string): void => {
  if (props.disabled) return
  emit('update:modelValue', props.modelValue + num)
}

const handleBackspace = (): void => {
  if (props.disabled) return
  emit('update:modelValue', props.modelValue.slice(0, -1))
}

const handleClear = (): void => {
  if (props.disabled) return
  emit('update:modelValue', '')
}

const handleSubmit = (): void => {
  if (props.disabled) return
  emit('submit')
}
</script>

<template>
  <div class="bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10">
    <!-- Number Grid -->
    <div class="grid grid-cols-3 gap-2 mb-2">
      <button
        v-for="num in ['1', '2', '3', '4', '5', '6', '7', '8', '9']"
        :key="num"
        @click="handleNumberClick(num)"
        :disabled="disabled"
        class="h-14 rounded-xl bg-white/10 text-white text-2xl font-bold 
               hover:bg-white/20 active:bg-white/30 transition-all duration-150
               disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ num }}
      </button>
    </div>
    
    <!-- Bottom Row: Minus, 0, Backspace -->
    <div class="grid grid-cols-3 gap-2 mb-2">
      <button
        @click="handleNumberClick('-')"
        :disabled="disabled || modelValue.includes('-')"
        class="h-14 rounded-xl bg-white/10 text-white text-2xl font-bold 
               hover:bg-white/20 active:bg-white/30 transition-all duration-150
               disabled:opacity-50 disabled:cursor-not-allowed"
      >
        −
      </button>
      <button
        @click="handleNumberClick('0')"
        :disabled="disabled"
        class="h-14 rounded-xl bg-white/10 text-white text-2xl font-bold 
               hover:bg-white/20 active:bg-white/30 transition-all duration-150
               disabled:opacity-50 disabled:cursor-not-allowed"
      >
        0
      </button>
      <button
        @click="handleBackspace"
        :disabled="disabled"
        class="h-14 rounded-xl bg-orange-500/30 text-orange-300 text-xl font-bold 
               hover:bg-orange-500/50 active:bg-orange-500/70 transition-all duration-150
               disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ⌫
      </button>
    </div>
    
    <!-- Action Buttons: Clear & Submit -->
    <div class="grid grid-cols-2 gap-2">
      <button
        @click="handleClear"
        :disabled="disabled"
        class="h-12 rounded-xl bg-red-500/30 text-red-300 font-bold 
               hover:bg-red-500/50 active:bg-red-500/70 transition-all duration-150
               disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Hapus
      </button>
      <button
        @click="handleSubmit"
        :disabled="disabled"
        class="h-12 rounded-xl bg-green-500/50 text-green-200 font-bold 
               hover:bg-green-500/70 active:bg-green-500/90 transition-all duration-150
               disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ✓ Cek
      </button>
    </div>
  </div>
</template>
