import styles from '../App.module.css'
import { ChangeEvent, FormEvent, useState } from 'react'
import type { SearchType } from '../types';
import { countries } from '../data/countris'
import Alert from '../alert/Alert';

type FormProps = {
  feachWeather: (search: SearchType) => Promise<void>
}
function Form( {feachWeather}: FormProps) {
  const [search, setSearch] = useState<SearchType>({
    city: '',
    country: ''
  });
  const [alert, setAlert] = useState('')
  const handleChange= (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> )=>{
    setSearch(
      {
        ...search,
        [e.target.name] : e.target.value
      }
    )
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(Object.values(search).includes('')){
      setTimeout(() => {
        setAlert('')
      }, 2000);
      setAlert('Todos los campos son obligatorios')
      return
    }
    feachWeather(search);
  }

  return (
    <form className={styles.form}
      onSubmit={handleSubmit}
    >
        {alert && <Alert>{alert}</Alert>}
        <div className={styles.files}>
            <label htmlFor="city">Ciuda:</label>
            <input 
            name='city'
            id='city'
            type="text"
            value={search.city}
            onChange={handleChange}
            placeholder="Ingresa una ciudad..."/>
        </div>
          <div className={styles.files}>
            <label htmlFor="country">Pais:</label>
            <select className={styles.selectpais}
              value={search.country} name="country" id="country"
              onChange={handleChange}
              >
                <option 
                  value=""
                >--- Seleccione un País ---</option>
                {
                  countries.map(country => (
                    <option
                      key={country.code}
                      value={country.code}
                    >
                      {country.name}
                    </option>
                  ))
                }
              
            </select>
          </div>
          <div className={styles.files}>
            <input className={styles.submit} type="submit" value="Buscar" />
          </div>
    </form>

  )
}

export default Form