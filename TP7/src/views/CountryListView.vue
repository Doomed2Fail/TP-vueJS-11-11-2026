<template>
  <h1>Explorateur de pays</h1>

  <p class="loading" v-show="loading">Chargement des pays...</p>
  <p class="error" v-if="error">{{ error }}</p>

  <div class="toolbar">
    <input v-model="recherche" placeholder="Rechercher un pays..." />
  </div>

  <div class="grid">
    <CountryCard v-for="country in paysAffiches" :key="country.cca3" :country="country" />
  </div>
</template>

<script>
import CountryCard from '../components/CountryCard.vue'

const API_URL = 'https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,cca3'

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
    // TODO 2 : this.countries filtré selon this.recherche (nom commun,
    // insensible à la casse)
    paysAffiches() {
      const texte = this.recherche.trim().toLowerCase()
      return this.countries.filter(country => country.name.common.toLowerCase().includes(texte))
    }
  },
  methods: {
    // TODO 1 : GET API_URL avec fetch. N'oubliez pas que fetch() ne rejette
    // pas sur une erreur HTTP (404, 500...) -- vérifiez response.ok avant de
    // parser le JSON, et renseignez this.error dans un catch. Dans tous les
    // cas (succès ou échec), this.loading doit repasser à false à la fin.
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
        this.error = 'Impossible de charger les pays. La version de l’API utilisée par le TP peut être indisponible.'
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
