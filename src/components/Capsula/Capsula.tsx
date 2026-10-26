import { techs, type TechId } from '../../data/techs'
import styles from './Capsula.module.css'

interface Props {
  id: TechId
  tamano?: 'normal' | 'compacta'
}

export default function Capsula({ id, tamano = 'normal' }: Props) {
  const { nombre, icono } = techs[id]

  return (
    <li className={`${styles.capsula} ${styles[tamano]} ${icono ? '' : styles.sinIcono}`}>
      {icono && (
        <span className={styles.insignia}>
          <img src={icono} alt="" width={18} height={18} loading="lazy" decoding="async" />
        </span>
      )}
      {nombre}
    </li>
  )
}
