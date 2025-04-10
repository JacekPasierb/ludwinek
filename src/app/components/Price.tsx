import React from 'react'
import styles from "../styles/price.module.css"

const Price = () => {
  return (
    <section className={styles.pricing}>
    <h2>Cennik wędkowania (sezon 2023)</h2>
    <ul>
      <li><strong>30 zł – z brzegu</strong> <br />
        <small>(wędkowanie od 6:00 do zmierzchu, możliwość dokupienia trzeciej wędki za 10 zł)</small>
      </li>
      <li><strong>50 zł – doba karpiowa</strong> <br />
        <small>(po wcześniejszym uzgodnieniu z właścicielem)</small>
      </li>
    </ul>
  </section>
  
  )
}

export default Price