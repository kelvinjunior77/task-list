<template>

    <!-- Efeito de Loading -->
    <div v-if="isLoading"
        class="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50 transition-opacity duration-300">
        <div class="text-center space-y-4">
            <!-- Spinner animado -->
            <div class="relative">
                <div
                    class="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto">
                </div>
                <!-- Ícone central (opcional) -->
                <svg class="w-8 h-8 text-indigo-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2">
                    </path>
                </svg>
            </div>
            <p class="text-lg font-medium text-gray-700 animate-pulse">Carregando...</p>
        </div>
    </div>

    <div v-show="!isLoading"
        class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <PWAInstallPrompt />


        <div class="max-w-3xl mx-auto">

            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
                <div>
                    <h1 class="flex items-center gap-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
                        <span class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-2 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 sm:h-7 sm:w-7" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                        </span>
                        <span
                            class="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Minhas
                            Tarefas</span>
                    </h1>
                   

                </div>

                

                <div class="flex flex-col xs:flex-row gap-2 sm:gap-4" v-for="menu in menus" :key="menu.id">
                    <router-link :to="menu.path"
                        class="px-3 py-1.5 sm:px-4 sm:py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-base">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {{ menu.nome }}
                    </router-link>

                </div>

                <div class="flex flex-col xs:flex-row gap-2 sm:gap-4">
                    <button @click="showAboutModal = true"
                        class="px-3 py-1.5 sm:px-4 sm:py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-base">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Sobre

                    </button>
                </div>

            </div>

            <!-- Formulário responsivo -->
            <div class="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
                <h2 class="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Adicionar Nova Tarefa</h2>
                <form @submit.prevent="addTask" class="flex flex-col sm:flex-row gap-3">
                    <input v-model="newTask.title" type="text" placeholder="Título da tarefa" required
                        class="flex-1 px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base" />
                    <select v-model="newTask.priority"
                        class="px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base">
                        <option value="low">Baixa</option>
                        <option value="medium">Média</option>
                        <option value="high">Alta</option>
                    </select>
                    <button type="submit"
                        class="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm sm:text-base">
                        Adicionar
                    </button>
                </form>
            </div>

            <!-- Filtros responsivos -->
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6">
                <div class="flex flex-wrap gap-2">
                    <button @click="filter = 'all'"
                        :class="{ 'bg-indigo-600 text-white': filter === 'all', 'bg-white text-gray-700': filter !== 'all' }"
                        class="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-gray-300 transition-colors duration-200 text-xs sm:text-sm">
                        Todas ({{ totalTasks }})
                    </button>
                    <button @click="filter = 'pending'"
                        :class="{ 'bg-indigo-600 text-white': filter === 'pending', 'bg-white text-gray-700': filter !== 'pending' }"
                        class="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-gray-300 transition-colors duration-200 text-xs sm:text-sm">
                        Pendentes ({{ pendingTasks }})
                    </button>
                    <button @click="filter = 'completed'"
                        :class="{ 'bg-indigo-600 text-white': filter === 'completed', 'bg-white text-gray-700': filter !== 'completed' }"
                        class="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-gray-300 transition-colors duration-200 text-xs sm:text-sm">
                        Concluídas ({{ completedTasks }})
                    </button>
                </div>
                <div v-if="filteredTasks.length > 0" class="text-xs sm:text-sm text-gray-500">
                    {{ completedTasks }} de {{ totalTasks }} tarefas concluídas
                </div>
            </div>

            <!-- Lista de tarefas responsiva -->
            <div v-if="filteredTasks.length > 0" class="space-y-3 sm:space-y-4">
                <div v-for="task in filteredTasks" :key="task.id"
                    class="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg">
                    <div class="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                        <div class="flex items-center gap-3 sm:gap-4 sm:flex-shrink-0">
                            <input type="checkbox" v-model="task.completed" @change="updateTask(task)"
                                class="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 rounded focus:ring-indigo-500" />
                            <div class="sm:hidden flex gap-2">
                                <button @click="editTask(task)"
                                    class="p-1 text-indigo-600 hover:text-indigo-800 rounded-full hover:bg-indigo-50 transition-colors duration-200"
                                    title="Editar">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                                <button @click="showDeleteModal(task.id)"
                                    class="p-1 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50 transition-colors duration-200"
                                    title="Excluir">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-2">
                                <h3 :class="{ 'line-through text-gray-400': task.completed }"
                                    class="text-base sm:text-lg font-medium text-gray-900 truncate">
                                    {{ task.title }}
                                </h3>
                                <span :class="{
                                    'bg-green-100 text-green-800': task.priority === 'low',
                                    'bg-yellow-100 text-yellow-800': task.priority === 'medium',
                                    'bg-red-100 text-red-800': task.priority === 'high'
                                }" class="px-2 py-1 text-xs font-semibold rounded-full self-start sm:self-auto">
                                    {{ getPriorityLabel(task.priority) }}
                                </span>
                            </div>
                            <div
                                class="mt-1 sm:mt-2 flex flex-col xs:flex-row gap-1 sm:gap-3 text-xs sm:text-sm text-gray-500">
                                <span>Criada em: {{ formatDate(task.createdAt) }}</span>
                                <span v-if="task.completed">Concluída em: {{ formatDate(task.updatedAt) }}</span>
                            </div>
                        </div>
                        <div class="hidden sm:flex gap-2">
                            <button @click="editTask(task)"
                                class="p-2 text-indigo-600 hover:text-indigo-800 rounded-full hover:bg-indigo-50 transition-colors duration-200"
                                title="Editar">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </button>
                            <button @click="showDeleteModal(task.id)"
                                class="p-2 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50 transition-colors duration-200"
                                title="Excluir">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mensagem vazia responsiva -->
            <div v-else class="bg-white rounded-lg shadow-md p-6 sm:p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-gray-400"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 class="mt-3 sm:mt-4 text-lg font-medium text-gray-900">Nenhuma tarefa encontrada</h3>
                <p class="mt-1 sm:mt-2 text-sm text-gray-500">
                    {{ filter === 'all' ? 'Você ainda não tem tarefas cadastradas.' :
                        filter === 'pending' ? 'Todas as tarefas estão concluídas!' :
                    'Nenhuma tarefa foi concluída ainda.' }}
                </p>
            </div>


            <!-- Modal de edição -->
            <div v-if="isEditing"
                class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-semibold text-gray-800">Editar Tarefa</h2>
                        <button @click="isEditing = false" class="text-gray-500 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <form @submit.prevent="saveEditedTask" class="space-y-4">
                        <div>
                            <label for="edit-title" class="block text-sm font-medium text-gray-700 mb-1">Título</label>
                            <input id="edit-title" v-model="editedTask.title" type="text" required
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div>
                            <label for="edit-priority"
                                class="block text-sm font-medium text-gray-700 mb-1">Prioridade</label>
                            <select id="edit-priority" v-model="editedTask.priority"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                                <option value="low">Baixa</option>
                                <option value="medium">Média</option>
                                <option value="high">Alta</option>
                            </select>
                        </div>
                        <div class="flex items-center">
                            <input id="edit-completed" v-model="editedTask.completed" type="checkbox"
                                class="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500" />
                            <label for="edit-completed" class="ml-2 block text-sm text-gray-700">Concluída</label>
                        </div>
                        <div class="flex justify-end gap-3 pt-4">
                            <button type="button" @click="isEditing = false"
                                class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                                Cancelar
                            </button>
                            <button type="submit"
                                class="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                Salvar
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Modal de confirmação para exclusão -->
            <div v-if="showDeleteConfirmation"
                class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-semibold text-gray-800">Confirmar Exclusão</h2>
                        <button @click="showDeleteConfirmation = false" class="text-gray-500 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <p class="text-gray-600 mb-6">Tem certeza que deseja excluir esta tarefa? Esta ação não pode ser
                        desfeita.</p>
                    <div class="flex justify-end gap-3">
                        <button @click="showDeleteConfirmation = false"
                            class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                            Cancelar
                        </button>
                        <button @click="confirmDelete"
                            class="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                            Excluir
                        </button>
                    </div>
                </div>
            </div>

            <!-- Modal Sobre -->
            <div v-if="showAboutModal"
                class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-semibold text-gray-800">Sobre o Aplicativo</h2>
                        <button @click="showAboutModal = false" class="text-gray-500 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div class="space-y-4">
                        <div>
                            <h3 class="text-lg font-medium text-gray-900 mb-2">Gestor de Tarefas Pessoal</h3>
                            <p class="text-gray-600">
                                Um aplicativo simples para gerenciar suas tarefas diárias.
                            </p>
                        </div>

                        <!-----
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">Como funciona</h3>
              <ul class="list-disc pl-5 text-gray-600 space-y-1">
                <li>Cada usuário tem um ID único na URL</li>
                <li>Use o botão "Copiar link" para salvar seu acesso</li>
                <li>Clique em "Nova conta" para começar uma nova lista</li>
                <li>Seus dados ficam apenas no seu navegador</li>
              </ul>
            </div>
            ---->

                        <div class="pt-4 border-t border-gray-200">
                            <h3 class="text-lg font-medium text-gray-900 mb-2">--</h3>
                            <div class="flex items-center gap-3">
                                <div class="bg-indigo-100 p-2 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                    </svg>
                                </div>
                                <div>
                                    <p class="font-medium text-gray-900">Kelvin Junior</p>
                                    <p class="text-sm text-gray-500">Desenvolvedor Web</p>
                                </div>
                            </div>
                        </div>

                        <div class="flex gap-4 pt-4 border-t border-gray-200">

                            <!-- Ícone do Facebook -->
                            <a href="#" class="text-indigo-600 hover:text-indigo-800" title="Facebook">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                                </svg>
                            </a>
                            <a href="https://github.com/kelvinjunior77" class="text-indigo-600 hover:text-indigo-800">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                            <!----
              <a href="#" class="text-indigo-600 hover:text-indigo-800">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg> 
              </a>
              
              <a href="kelvinjunior592@gmail.com" class="text-indigo-600 hover:text-indigo-800">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              ----->
                        </div>
                    </div>
                </div>
            </div>
            <!----->
        </div>


        


    </div>



</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useTaskStore } from '/src/stores/taskStore';
import PWAInstallPrompt from '/src/components/PWAInstallPrompt.vue';

const menus = [
    { id: 1, nome: "Frances", path: '/lang/frances' }
]


// Configuração do Pinia
const taskStore = useTaskStore();

const isLoading = ref(true);

onMounted(async () => {
    try {

        // Tempo mínimo de exibição do loading (para não piscar rápido demais)
        setTimeout(() => {
            isLoading.value = false;
        }, 1000);

    } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
        isLoading.value = false;
    }
});

const showDeleteConfirmation = ref(false);
const taskToDelete = ref(null);

const showAboutModal = ref(false);

const showDeleteModal = (id) => {
    taskToDelete.value = id;
    showDeleteConfirmation.value = true;
};

const confirmDelete = () => {
    taskStore.deleteTask(taskToDelete.value);
    showDeleteConfirmation.value = false;
    taskToDelete.value = null;
};

// Estado local
const newTask = ref({
    title: '',
    priority: 'medium',
    completed: false
});

const isEditing = ref(false);
const editedTask = ref({
    id: null,
    title: '',
    priority: 'medium',
    completed: false
});

const filter = ref('all');

// Carrega tarefas ao montar o componente
onMounted(() => {
    taskStore.loadTasks();
});

// Computed properties
const filteredTasks = computed(() => {
    if (filter.value === 'pending') {
        return taskStore.tasks.filter(task => !task.completed);
    } else if (filter.value === 'completed') {
        return taskStore.tasks.filter(task => task.completed);
    }
    return taskStore.tasks;
});

const totalTasks = computed(() => taskStore.tasks.length);
const pendingTasks = computed(() => taskStore.tasks.filter(task => !task.completed).length);
const completedTasks = computed(() => taskStore.tasks.filter(task => task.completed).length);

// Métodos
const addTask = () => {
    if (newTask.value.title.trim() === '') return;

    taskStore.addTask({
        ...newTask.value,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    });

    newTask.value = {
        title: '',
        priority: 'medium',
        completed: false
    };
};

const updateTask = (task) => {
    taskStore.updateTask({
        ...task,
        updatedAt: new Date().toISOString()
    });
};

const editTask = (task) => {
    editedTask.value = { ...task };
    isEditing.value = true;
};

const saveEditedTask = () => {
    taskStore.updateTask({
        ...editedTask.value,
        updatedAt: new Date().toISOString()
    });
    isEditing.value = false;
};

const deleteTask = (id) => {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        taskStore.deleteTask(id);
    }
};

const getPriorityLabel = (priority) => {
    const labels = {
        low: 'Baixa',
        medium: 'Média',
        high: 'Alta'
    };
    return labels[priority];
};

const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
};
</script>