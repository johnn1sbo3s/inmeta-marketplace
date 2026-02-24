<script setup lang="ts">
import PasswordInput from '@/components/ui/PasswordInput.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import type { FormSubmitEvent } from '@nuxt/ui'
import { reactive } from 'vue'
import * as z from 'zod'
import { useAuth } from '@/composables/useAuth'
import FormField from '@/components/ui/FormField.vue'
import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()
const { registerMutation } = useAuth()

const registerSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.email('E-mail inválido'),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
  passwordConfirmation: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres')
}).refine((data) => data.password === data.passwordConfirmation, {
  message: 'As senhas não coincidem',
  path: ['passwordConfirmation']
})

type RegisterPayloadType = z.infer<typeof registerSchema>

const registerState = reactive<RegisterPayloadType>({
  name: '',
  email: '',
  password: '',
  passwordConfirmation: ''
})

const onSubmit = async (event: FormSubmitEvent<RegisterPayloadType>) => {
  try {
    await registerMutation.mutateAsync(event.data)
    uiStore.openLogin()
  } catch (error) {
    console.error('Erro no registro', error)
  }
}
</script>

<template>
  <BaseModal
    v-model:open="uiStore.isRegisterModalOpen"
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
            Criar uma conta
          </h1>
          <p class="text-muted">
            Registre-se para colecionar e trocar cartas.
          </p>
        </div>
      </header>

      <main class="flex flex-col items-center gap-4">
        <UForm
          class="flex flex-col gap-2 w-full"
          :schema="registerSchema"
          :state="registerState"
          @submit="onSubmit"
        >
          <FormField
            label="Nome"
            name="name"
          >
            <UInput
              v-model="registerState.name"
              type="text"
              class="w-full"
            />
          </FormField>

          <FormField
            label="Email"
            name="email"
          >
            <UInput
              v-model="registerState.email"
              type="email"
              class="w-full"
            />
          </FormField>

          <FormField
            label="Password"
            name="password"
          >
            <PasswordInput v-model="registerState.password" />
          </FormField>

          <FormField
            label="Confirmar senha"
            name="passwordConfirmation"
          >
            <PasswordInput v-model="registerState.passwordConfirmation" />
          </FormField>

          <BaseButton
            label="Registrar"
            type="submit"
            class="mt-4"
            :loading="registerMutation.isPending.value"
            block
          />
        </UForm>

        <span class="text-xs">
          Já tem uma conta?

          <a
            href="#"
            class="text-primary font-semibold"
            @click.prevent="uiStore.openLogin"
          >
            Faça login
          </a>
        </span>
      </main>
    </div>
  </BaseModal>
</template>
