<script setup lang="ts">
import { ref } from 'vue'

const model = defineModel<string>()

const showPassword = ref(false)
</script>

<template>
  <UInput
    v-model="model"
    class="w-full"
    :type="showPassword ? 'text' : 'password'"
  >
    <template #trailing>
      <UButton
        color="neutral"
        variant="link"
        size="sm"
        :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
        :aria-label="showPassword ? 'Hide password' : 'Show password'"
        :aria-pressed="showPassword"
        aria-controls="password"
        @click="showPassword = !showPassword"
      />
    </template>
  </UInput>
</template>