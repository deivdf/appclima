import styles from "../src/App.module.css"
import Form from "./forms/Form"
import useWeather from "./hooks/useWeather"
function App() {
  const { feachWeather } = useWeather()
  return (
    <>
      <h1 className={styles.title}>Buscador de Clima</h1>
      <div className={styles.container}>
        <div className={styles.search}>
          <Form
            feachWeather={feachWeather}
          />
        </div>
        <div className={styles.card}>
          <h2>Ciudad</h2>
          <p>Temperatura: </p>
        </div>
      </div>
    </>
  )
}

export default App
