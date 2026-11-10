import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    loading: true,
    filtre: 'toutes',
    newTask: { title: '', priority: 'moyenne' }
  }),
  getters: {
    tachesFiltrees(state) {
      if (state.filtre === 'actives') return state.tasks.filter(t => !t.done)
      if (state.filtre === 'terminees') return state.tasks.filter(t => t.done)
      return state.tasks
    },
    tachesTriees() {
      const ordre = { haute: 0, moyenne: 1, basse: 2 }
      return [...this.tachesFiltrees].sort ( (a, b) => ordre[a.priority] - ordre[b.priority])
    },
    nombreRestantes(state) {
      return state.tasks.filter(t => !t.done).length
    },
    formulaireValide(state) {
      return state.newTask.title.trim() !== ''
    }
  },
  actions: {
    chargerTaches() {
      setTimeout(() => {
        this.tasks = [
          { id: 1, title: 'Préparer le TD réseaux', priority: 'haute', done: false },
          { id: 2, title: 'Relire le rapport de stage', priority: 'moyenne', done: false },
          { id: 3, title: 'Ranger le bureau', priority: 'basse', done: true }
        ]
        this.loading = false
      }, 500)
    },
    ajouterTache() {
      if (this.loading || !this.formulaireValide) return
      const id = Math.max(0, ...this.tasks.map(t => t.id)) + 1
      this.tasks.push({ id, title: this.newTask.title.trim(), priority: this.newTask.priority, done: false })
      this.newTask = { title: '', priority: 'moyenne' }
    },
    basculerTache(task) {
      task.done = !task.done
    },
    supprimerTache(task) {
      this.tasks = this.tasks.filter(t => t.id !== task.id)
    }
  }
})
