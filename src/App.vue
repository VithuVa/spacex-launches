
<template>
  <div class="p-4 space-y-8"> <!--espace entre les élements et entre le contenu et les bords  -->
    <h1 class="text-3xl font-bold">SpaceX Launches</h1> <!--Titre principal de police 'text-3xl' et en gras -->

    <section>
      <h2 class="text-2xl font-bold"> Prochain lancement</h2> <!-- Titre secondaire -->
      <p>{{ nextLaunch?.name }} - {{ countdown }}s</p><!-- Affiche le nom du prochain lancement et un décompte qui est mis à jour -->
    </section>

    <section><!-- Bouton pour voir les succès et les échecs des différents lancements de fusées -->
      <label>Filtrer:
        <select v-model="filter" ><!--menu  -->
          <option value="all">Tous</option><!--filter.value="all"  -->
          <option value="success">Réussis</option><!--filter.value="success"  -->
          <option value="failed">Échoués</option><!--filter.value="failed"  -->
        </select>
      </label>
    </section>

    <section>
      <h2 class="text-2xl font-bold"> Derniers lancements</h2>
      <ul class="space-y-1"><!--  Liste des lancements avec un espacement vertical-->
        <li v-for="launch in filteredLaunches.slice(0, 10)" :key="launch.id" class="cursor-pointer hover:underline" @click="selectLaunch(launch)">
          {{ launch.name }} - {{ formatDate(launch.date_utc) }} 
          <!--filteredLaunches.slice(0, 10) : liste filtrée et sélectionne seulement les 10 premiers -->
          <!--key="launch.id" : fournit à vue un identifiant unique  -->
          <!--@click="selectLaunch(launch)" : ouvre le modal avec les détails du lancement sélectionné -->
        </li>
      </ul>
    </section>

    <LaunchModal :launch="selectedLaunch" :visible="modalVisible" @close="modalVisible = false" />
    <!-- Composant LaunchModal pour afficher les détails du lancement sélectionné -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import LaunchModal from './components/LaunchModal.vue'
import { fetchNextLaunch, fetchLaunches, enrichLaunchData } from './api/spacex'
import { formatDate } from './utils/formatters'

const nextLaunch = ref<any>(null) // prochain lancement à venir
const countdown = ref(0) // décompte en secondes jusqu'au prochain lancement
const launches = ref<any[]>([]) // liste des lancements
const selectedLaunch = ref<any>(null) // lancement sélectionné dans la liste
const modalVisible = ref(false) // contrôle d'affichage de la modale
const filter = ref<'all' | 'success' | 'failed'>('all') // filtre des lancements

const filteredLaunches = computed(() => {
  return launches.value.filter(l => {// Filtre les lancements en fonction du statut
    if (filter.value === 'all') return true // Si le filtre est 'all', retourne tous les lancements
    return filter.value === 'success' ? l.success : l.success === false// Si le filtre est 'success', retourne les lancements réussis, sinon retourne les échecs
  })
})


function selectLaunch(launch: any) {
  enrichLaunchData(launch).then(enriched => {// enrichit les données du lancement sélectionné
    selectedLaunch.value = enriched // stocke les données enrichies dans le lancement sélectionné
    modalVisible.value = true
  })
}

onMounted(async () => {
  nextLaunch.value = await fetchNextLaunch() // Récupère le prochain lancement
  launches.value = await fetchLaunches() // Récupère la liste des lancements
  setInterval(() => {
    const date = new Date(nextLaunch.value.date_utc).getTime() // Convertit la date du prochain lancement en timestamp
    countdown.value = Math.floor((date - Date.now()) / 1000) // Calcule le décompte en secondes jusqu'au prochain lancement
  }, 1000)
})
</script>
