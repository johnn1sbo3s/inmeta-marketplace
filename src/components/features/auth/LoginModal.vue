<script setup lang="ts">
import PasswordInput from '@/components/ui/PasswordInput.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import type { FormSubmitEvent } from '@nuxt/ui'
import { reactive } from 'vue'
import * as z from 'zod'
import { useAuth } from '@/composables/useAuth'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useUiStore } from '@/stores/ui'
import FormField from '@/components/ui/FormField.vue'

const uiStore = useUiStore()
const { loginMutation } = useAuth()

const loginSchema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres')
})

type LoginPayloadType = z.infer<typeof loginSchema>

const loginState = reactive<LoginPayloadType>({
  email: '',
  password: ''
})

const onSubmit = async (event: FormSubmitEvent<LoginPayloadType>) => {
  try {
    await loginMutation.mutateAsync(event.data)
    uiStore.closeAll()
  } catch (error) {
    console.error('Erro no login', error)
  }
}
</script>

<template>
  <BaseModal
    v-model:open="uiStore.isLoginModalOpen"
    :dismissible="false"
  >
    <div class="flex flex-col gap-6">
      <header class="flex flex-col gap-4 items-center">
        <img
          src="/img/inmeta-cards-full.png"
          alt="Inmeta Cards"
          class="h-20"
        >

        <div class="flex flex-col text-center">
          <h1 class="text-2xl font-semibold">
            Bem-vindo(a)!
          </h1>
          <p class="text-muted">
            Faça login para continuar.
          </p>
        </div>
      </header>

      <main class="flex flex-col items-center gap-4">
        <UForm
          class="flex flex-col gap-2 w-full"
          :schema="loginSchema"
          :state="loginState"
          @submit="onSubmit"
        >
          <FormField
            label="Email"
            name="email"
          >
            <UInput
              v-model="loginState.email"
              type="email"
              class="w-full"
            />
          </FormField>

          <FormField
            label="Password"
            name="password"
          >
            <PasswordInput v-model="loginState.password" />
          </FormField>

          <BaseButton
            label="Entrar"
            type="submit"
            class="mt-4"
            :loading="loginMutation.isPending.value"
            block
          />
        </UForm>

        <span class="text-xs">
          Não tem uma conta?

          <a
            href="#"
            class="text-primary font-semibold"
            @click.prevent="uiStore.openRegister"
          >
            Registre-se
          </a>
        </span>
      </main>
    </div>
  </BaseModal>
</template>
