<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="flex items-center gap-2 justify-between w-full">
    <div class="flex flex-col gap-0.5">
      <h1 class="text-4xl font-semibold">
        {{ title }}
      </h1>

      <p class="text-sm text-muted">
        {{ description }}
      </p>
    </div>

    <slot name="right" />
  </div>
</template>