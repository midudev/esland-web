
interface Props {
  name: string
  foto: string
  edicion: string
  comunidad: number
  streamers: number
  total: number
  position: string
  background: string
}

export default function StreamerCard({name, foto, edicion, comunidad, streamers, total, position, background}: Props) {
  return (
    <div
  class={`max-w-full rounded-lg shadow ${background} border-[#0d507a] animate-fade-up`}
>
  <p
    class="mx-11 shadow-md absolute text-center rounded-b-lg rounded-t-sm bg-white -mt-[2px] text-black py-2 font-bold font-tomaso size-11"
  >
    {position}
  </p>
  <img
    class="rounded-t-lg object-cover"
    src={`/archivo-page/${edicion}/palmares/desktop/${foto}.webp`}
    alt={name}
    title={name}
  />
  <div class="p-5">
    <p
      class="mb-2 text-xl font-bold tracking-tight dark:text-white uppercase text-balance"
    >
      {name}
    </p>
    <p
      class="mt-5 flex flex-col mb-3 font-normal text-gray-700 dark:text-gray-400 uppercase"
    >
      <strong>Comunidad: {comunidad}</strong>
      <strong>Streamers: {streamers}</strong>
      <strong>Total: {total}</strong>
    </p>
  </div>
</div>
  )
}
