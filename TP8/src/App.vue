<template>
  <h1>Gestionnaire de tâches</h1>
  <p class="loading" v-show="store.loading">Chargement...</p>
  <form @submit.prevent="store.ajouterTache()">
    <input v-model="store.newTask.title" placeholder="Nouvelle tâche" />
    <select v-model="store.newTask.priority">
      <option value="basse">Basse</option>
      <option value="moyenne">Moyenne</option>
      <option value="haute">Haute</option>
    </select>
    <button type="submit" :disabled="store.loading || !store.formulaireValide">Ajouter</button>
  </form>
  <div class="tabs">
    <button :class="{ active: store.filtre === 'toutes' }" @click="store.filtre = 'toutes'">Toutes</button>
    <button :class="{ active: store.filtre === 'actives' }" @click="store.filtre = 'actives'">Actives</button>
    <button :class="{ active: store.filtre === 'terminees' }" @click="store.filtre = 'terminees'">Terminées</button>
  </div>
  <p>{{ store.nombreRestantes }} tâche(s) restante(s)</p>
  <div class="task" :class="{ done: task.done }" v-for="task in store.tachesTriees" :key="task.id">
    <input type="checkbox" :checked="task.done" @change="store.basculerTache(task)" />
    <span class="task-title">{{ task.title }}</span>
    <span class="priority" :class="'priority-' + task.priority">{{ task.priority }}</span>
    <button class="btn-delete" @click="store.supprimerTache(task)">Supprimer</button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTasksStore } from './stores/tasks'

const store = useTasksStore()
onMounted(() => {
  store.chargerTaches()
})
</script>
