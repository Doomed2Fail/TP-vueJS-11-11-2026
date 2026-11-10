<template>
  <p class="loading" v-show="loading">Chargement...</p>
  <p class="error" v-if="error">{{ error }}</p>

  <div v-if="country">
    <img :src="country.flags.svg" :alt="`Drapeau ${country.name.common}`" style="width: 200px;" />
    <h1>{{ country.name.common }}</h1>
    <p>Nom officiel : {{ country.name.official }}</p>
    <p>Capitale : {{ country.capital ? country.capital[0] : '—' }}</p>
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
    // TODO 3 : même principe que chargerPays() dans CountryListView, mais
    // sur https://restcountries.com/v3.1/alpha/<code>?fields=... où <code>
    // vient de this.$route.params.code. La réponse peut être un objet ou un
    // tableau d'un seul élément selon les cas -- gérez les deux.
    async chargerPays() {
      this.loading = true
      this.error = null
      this.country = null
      try {
        const code = this.$route.params.code
        const url = `https://restcountries.com/v3.1/alpha/${encodeURIComponent(code)}?fields=name,capital,region,population,flags,cca3`
        const response = await fetch(url)
        if (!response.ok) throw new Error('Erreur HTTP ' + response.status)
        const resultat = await response.json()
        if (resultat.success === false) throw new Error('API indisponible')
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
