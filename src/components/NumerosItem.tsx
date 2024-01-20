import styles from '@/components/styles/NumerosItem.module.css'

interface Props {
  title: string,
  children?: preact.ComponentChildren
}

export default function NumerosItem({title,children}:Props) {
  return (
    <div class="flex flex-col justify-center items-center">
      <span class={`${styles.number} text-7xl font-bold tabular-nums tracking-tighter`}>
        {children}
      </span>
      <span class="uppercase opacity-70">{title}</span>
    </div>
  )
}



