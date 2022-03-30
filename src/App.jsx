import styled from "@emotion/styled"
import { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Resultado from "./components/Resultado";
import Spinner from "./components/Spinner";
import { monedas } from "./data/monedas";
import ImagenCripto from './img/imagen-criptos.png'


const Contenedor = styled.div`
  max-width: 900px;
  margin : 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #fff;
  width: 90%;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content:'';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

function App() {

  const [monedas, setMonedas] = useState({})
  const [resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(() => {

    if (Object.keys(monedas).length > 0) {
      const cotizarCripto = async () => {
        setCargando(true);
        setResultado({});
        const { moneda, criptomoneda } = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        const respuesta = await fetch(url)
        const resultado = await respuesta.json();

        setResultado(resultado.DISPLAY[criptomoneda][moneda])
        //[criptomoneda][moneda] si no lo pones de esta forma lo que hara es que buscará
        //en ese objeto por esas propiedades no las va a tomar como variables
        //se usa esta sintaxis  de forma en que 
        //BUSCARA UNA PROPIEDAD EN ESE OBJETO QUE TENGA EL NOMBRE DE LA CRIPTO Y MONEDA
        //va a ir entrando en ese objeto tomando las llaves diferentes en cada consulta 
        setCargando(false)

      }
      cotizarCripto();
    }
  }, [monedas])


  return (
    <Contenedor>
      <Imagen
        src={ImagenCripto}
        alt="imagenes criptomonedas"
      />
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario
          setMonedas={setMonedas}
        />

        {cargando && <Spinner />}
       {resultado.PRICE && <Resultado resultado={resultado} />} 
      </div>
    </Contenedor>
  )
}

export default App
