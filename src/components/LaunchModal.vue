<template>
  <div v-if="visible" class="fixed inset-0  flex justify-center items-center "> <!--  Affiche le modal si visible -->
    <div class="bg-white p-6 rounded max-w-lg w-full overflow-y-auto max-h-[90vh]"> <!--  Conteneur du modal avec un fond blanc-->
      <h2 class="text-xl ">{{ launch.name }}</h2>
      <p >Date : {{ formattedDate }}</p>
      <p >Lieu : {{ launch.launchpadName }}</p>
      <p >Payloads : {{ payloadList.join(', ') }}</p>
      <p >Clients : {{ clientList.join(', ') }}</p>
      <p >Details:{{ launch.details }}</p>
      <img :src="launch.links.patch.large" v-if="launch.links.patch.large"> <!-- Affiche l'image du patch du lancement-->
      <a :href="launch.links.article" target="_blank" class="text-blue-500 underline">Article</a> <!-- Lien vers l'article -->
      <div class="mt-2">
        <label>
          <input type="checkbox" v-model="showVideo" /> Voir vidéo YouTube 
        </label>
        <div v-if="showVideo" class="mt-2">
          <iframe
            class="w-full h-64"
            :src="youtubeUrl"
          >
        </iframe>
        </div>
      </div>
      <button @click="$emit('close')" class=" bg-red-500 text-white  ">Fermer</button> <!-- Bouton pour fermer le modal -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { formatDate, payloadNames, clientNames, youtubeEmbedUrl } from '../utils/formatters'

const props = defineProps<{ visible: boolean, launch: any }>() //visible pour savoir si le modale est affiché et launch pour les données du lancement
const showVideo = ref(false) // Contrôle l'affichage de la vidéo YouTube
const formattedDate = computed(() => formatDate(props.launch.date_utc)) // Formate la date du lancement en utilisant la fonction formatDate
const payloadList = computed(() => payloadNames(props.launch.payloads))  // Récupère les noms des charges utiles du lancement
const clientList = computed(() => clientNames(props.launch.payloads))  // Récupère les noms des clients du lancement
const youtubeUrl = computed(() => youtubeEmbedUrl(props.launch.links.youtube_id || props.launch.links.webcast)) // Génère l'URL de la vidéo YouTube à partir de l'ID ou du lien de diffusion en direct
</script>