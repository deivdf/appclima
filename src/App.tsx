import styles from "../src/App.module.css"
import Alert from "./alert/Alert"
import CardComponent from "./cards/CardComponent"
import Form from "./forms/Form"
import useWeather from "./hooks/useWeather"
function App() {
  const { loading,nofund, weather,feachWeather, hasWeaterData } = useWeather()
  
  return (
    <>
      <h1 className={styles.title}>Buscador de Clima</h1>
      <div className={styles.container}>
        <div className={styles.search}>
          <Form
            feachWeather={feachWeather}
          />
        </div>
        {loading && <div className={styles.spinner}>
  <div className={styles["double-bounce1"]}></div>
  <div className={styles["double-bounce2"]}></div>
</div>}
        {hasWeaterData && <div className={styles.card}>
          <CardComponent 
            weather={weather}
          />
        </div>}
          {nofund && <Alert>ciudad no encontrada</Alert>}
      </div>
    </>
  )
}

export default App
