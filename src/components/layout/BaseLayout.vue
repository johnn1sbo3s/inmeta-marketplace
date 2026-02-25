<script setup lang="ts">
import NavigationBar from '@/components/layout/NavigationBar.vue'
</script>

<template>
  <NavigationBar />

  <div class="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col overflow-x-hidden">
    <main class="grow container mx-auto px-5 py-6 bg-neutral-50">
      <slot />
    </main>

    <footer class="py-6 text-center text-sm text-gray-500">
      &copy; {{ new Date().getFullYear() }} Inmeta Marketplace - Desafio Técnico.
    </footer>
  </div>
</template>
