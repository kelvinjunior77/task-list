<template>
  <div v-if="showInstallPrompt" class="fixed bottom-4 right-4 z-50">
    <div class="bg-white rounded-lg shadow-xl p-4 max-w-xs border border-gray-200">
      <div class="flex items-start">
        <div class="flex-shrink-0 pt-0.5">
          <svg class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-gray-900">Instalar aplicativo</h3>
          <p class="mt-1 text-sm text-gray-500">Adicione "Minhas Tarefas" à sua tela inicial para uma melhor experiência.</p>
          <div class="mt-4 flex gap-2">
            <button @click="dismissPrompt" type="button" class="text-sm text-gray-500 hover:text-gray-700">
              Mais tarde
            </button>
            <button @click="installPWA" type="button" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              Instalar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showInstallPrompt = ref(false)
let deferredPrompt = null


onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e
    showInstallPrompt.value = true
  })
})

const installPWA = async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      console.log('Usuário aceitou a instalação')
    }
    deferredPrompt = null
    showInstallPrompt.value = false
  }
}

const dismissPrompt = () => {
  showInstallPrompt.value = false
}
</script>