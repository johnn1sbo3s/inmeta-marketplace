<template>
  <UButton
    v-bind="$attrs"
    :ui="{ base: 'rounded-lg' }"
  >
    <slot />
  </UButton>
</template>