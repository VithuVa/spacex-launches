# SpaceX Launches 🚀

Une application web développée avec Vue 3 et TypeScript permettant de consulter les lancements de SpaceX. Ce projet a été réalisé dans le cadre d'un test technique Front-End.

## 📋 Fonctionnalités

* **Prochain lancement** : Affichage du compte à rebours en temps réel pour le prochain décollage.
* **Historique** : Liste des 10 derniers lancements (filtrables par succès ou échec).
* **Détails** : Vue détaillée (Modal) pour chaque lancement comprenant :
    * Date et lieu de lancement.
    * Charges utiles (payloads) et clients.
    * Vidéo YouTube intégrée.
    * Lien vers l'article de presse.

## 🛠️ Stack Technique

Le projet utilise les technologies suivantes :
* **Vue 3** (Composition API & `<script setup>`)
* **TypeScript**
* **Vite** (Build tool)
* **Tailwind CSS** (Styling)
* **API SpaceX v5** (Source de données)

## ⚙️ Prérequis

Avant de commencer, assurez-vous d'avoir installé [Node.js](https://nodejs.org/) sur votre machine.

## 🚀 Installation et Lancement

1.  **Installation des dépendances**
    Ouvrez un terminal à la racine du projet et exécutez :
    ```bash
    npm install
    ```

2.  **Lancer le serveur de développement**
    Pour démarrer l'application en local :
    ```bash
    npm run dev
    ```
    L'application sera accessible (généralement) à l'adresse : `http://localhost:5173/`

3.  **Construction pour la production (Build)**
    Pour générer les fichiers optimisés pour la mise en production :
    ```bash
    npm run build
    ```
    Les fichiers seront générés dans le dossier `dist`.

4.  **Prévisualiser la production**
    Pour tester le build localement :
    ```bash
    npm run preview
    ```