<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Processos Seletivos</h1>
      <button 
        v-if="userRole === 'admin' || userRole === 'recruiter'"
        @click="showCreateModal = true"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Novo Processo
      </button>
    </div>

    <!-- Filtros -->
    <div class="mb-6 flex gap-4">
      <select v-model="filterStatus" class="border rounded px-3 py-2">
        <option value="">Todos</option>
        <option value="open">Abertos</option>
        <option value="closed">Fechados</option>
        <option value="draft">Rascunhos</option>
      </select>
      <input 
        v-model="searchQuery"
        type="text" 
        placeholder="Buscar processos..."
        class="border rounded px-3 py-2 flex-grow"
      >
    </div>

    <!-- Lista de Processos -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="process in filteredProcesses" 
        :key="process.id"
        class="border rounded-lg p-6 hover:shadow-lg transition-shadow"
      >
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-xl font-semibold">{{ process.title }}</h3>
          <span :class="statusClass(process.status)" class="px-2 py-1 rounded text-sm">
            {{ statusText(process.status) }}
          </span>
        </div>
        
        <p class="text-gray-600 mb-4">{{ truncate(process.description, 100) }}</p>
        
        <div class="text-sm text-gray-500 mb-4">
          <div>Código: {{ process.code }}</div>
          <div>Vagas: {{ process.maxCandidates }}</div>
          <div>Inscrições: {{ process.applicationCount }}</div>
        </div>

        <div class="flex justify-between">
          <router-link 
            :to="`/processes/${process.id}`"
            class="text-blue-600 hover:text-blue-800"
          >
            Ver detalhes
          </router-link>
          
          <button 
            v-if="userRole === 'candidate' && process.status === 'open'"
            @click="applyToProcess(process.id)"
            class="bg-green-600 text-white px-3 py-1 rounded text-sm"
          >
            Inscrever-se
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de Criação -->
    <CreateProcessModal 
      v-if="showCreateModal"
      @close="showCreateModal = false"
      @created="fetchProcesses"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import api from '@/services/api';
import CreateProcessModal from '@/components/CreateProcessModal.vue';

const store = useStore();
const processes = ref([]);
const filterStatus = ref('');
const searchQuery = ref('');
const showCreateModal = ref(false);

const userRole = computed(() => store.state.user?.role);

const filteredProcesses = computed(() => {
  return processes.value.filter(process => {
    const matchesStatus = !filterStatus.value || process.status === filterStatus.value;
    const matchesSearch = !searchQuery.value || 
      process.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      process.code.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesStatus && matchesSearch;
  });
});

async function fetchProcesses() {
  try {
    const response = await api.get('/processes');
    processes.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar processos:', error);
  }
}

function statusClass(status) {
  const classes = {
    'open': 'bg-green-100 text-green-800',
    'closed': 'bg-red-100 text-red-800',
    'draft': 'bg-yellow-100 text-yellow-800',
    'finished': 'bg-blue-100 text-blue-800'
  };
  return classes[status] || 'bg-gray-100 text-gray-800';
}

function statusText(status) {
  const texts = {
    'open': 'Aberto',
    'closed': 'Fechado',
    'draft': 'Rascunho',
    'finished': 'Finalizado'
  };
  return texts[status] || status;
}

function truncate(text, length) {
  return text.length > length ? text.substring(0, length) + '...' : text;
}

async function applyToProcess(processId) {
  try {
    await api.post(`/applications/${processId}/apply`);
    alert('Inscrição realizada com sucesso!');
  } catch (error) {
    alert('Erro ao realizar inscrição: ' + error.response?.data?.message);
  }
}

onMounted(() => {
  fetchProcesses();
});
</script>