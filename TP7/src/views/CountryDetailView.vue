<template>
  <p class="loading" v-show="loading">Chargement...</p>
  <p class="error" v-if="error">{{ error }}</p>

  <div v-if="country">
    <img :src="country.flags.svg" :alt="`Drapeau ${country.name}`" style="width: 200px;" />
    <h1>{{ country.name }}</h1>
    <p>Nom local : {{ country.nativeName || '—' }}</p>
    <p>Capitale : {{ country.capital || '—' }}</p>
    <p>Région : {{ country.region }}</p>
    <p>Population : {{ country.population.toLocaleString() }}</p>
  </div>

  <button @click="$router.back()">Retour</button>
</template>

<script>
export default {
  name: 'CountryDetailView',
  data() {
    return {
      country: null,
      loading: true,
      error: null
    }
  },
  methods: {
    async chargerPays() {
      this.loading = true
      this.error = null
      this.country = null
      try {
        const code = this.$route.params.code
        const url = `https://countries.dev/alpha/${encodeURIComponent(code)}`
        const response = await fetch(url)
        if (!response.ok) throw new Error('Erreur HTTP ' + response.status)
        const resultat = await response.json()
        this.country = Array.isArray(resultat) ? resultat[0] : resultat
        if (!this.country) throw new Error('Pays introuvable')
      } catch (error) {
        this.error = 'Impossible de charger ce pays.'
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
