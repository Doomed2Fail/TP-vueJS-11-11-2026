<template>
  <h1>Explorateur de pays</h1>

  <p class="loading" v-show="loading">Chargement des pays...</p>
  <p class="error" v-if="error">{{ error }}</p>

  <div class="toolbar">
    <input v-model="recherche" placeholder="Rechercher un pays..." />
  </div>

  <div class="grid">
    <CountryCard v-for="country in paysAffiches" :key="country.alpha3Code" :country="country" />
  </div>
</template>

<script>
import CountryCard from '../components/CountryCard.vue'

const API_URL = 'https://countries.dev/countries'

export default {
  name: 'CountryListView',
  components: { CountryCard },
  data() {
    return {
      countries: [],
      loading: true,
      error: null,
      recherche: ''
    }
  },
  computed: {
    paysAffiches() {
      const texte = this.recherche.trim().toLowerCase()
      return this.countries.filter(country => country.name.toLowerCase().includes(texte))
    }
  },
  methods: {
    async chargerPays() {
      this.loading = true
      this.error = null
      try {
        const response = await fetch(API_URL)
        if (!response.ok) throw new Error('Erreur HTTP ' + response.status)
        const resultat = await response.json()
        if (!Array.isArray(resultat)) throw new Error('Format de réponse inattendu')
        this.countries = resultat
      } catch (error) {
        this.error = 'Impossible de charger les pays.'
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    this.chargerPays()
  }
}
</script>
