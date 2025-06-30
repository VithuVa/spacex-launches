export async function fetchNextLaunch() {
  const res = await fetch('https://api.spacexdata.com/v5/launches/next') //requete HTP vers l'endpoint
  return await res.json() //transforme la reponse en JSON
}//récupère le prochain lancement de SpaceX

export async function fetchLaunches() {
  const res = await fetch('https://api.spacexdata.com/v5/launches/past?limit=50&order=desc') //requete HTP vers l'endpoint
  return await res.json() //transforme la reponse en JSON
}//récupère les 50 derniers lancements de SpaceX

export async function enrichLaunchData(launch: any) {
  const [launchpadData, payloadsData] = await Promise.all([
    fetch(`https://api.spacexdata.com/v4/launchpads/${launch.launchpad}`).then(r => r.json()), //récupère les données du site de lancement
    Promise.all(launch.payloads.map((id: string) =>
      fetch(`https://api.spacexdata.com/v4/payloads/${id}`).then(r => r.json()) //récupère les données des charges utiles
    ))
  ])

  return {
    ...launch,
    launchpadName: launchpadData.name,
    payloads: payloadsData
  }
}
