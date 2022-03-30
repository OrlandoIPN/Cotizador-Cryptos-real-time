import {useState} from 'react'
import styled from '@emotion/styled'

const Label =  styled.label`
    color: #FFF;
    display: block;
    font-family: 'Lato', sans-serif;
    font-size: 24px;
    font-weight: 700;
    margin: 15px 0;
`;

const Select = styled.select`
    width: 100%;
    font-size: 18px;
    padding: 14px;
    border-radius: 10px;
`;



const useSelectMonedas = (label, opciones) => {

    const [state, setState] = useState('')

  const SelectMonedas = () =>( 
       //parentesis es un return de react, eso significa que  va a imprimir algo en pantalla
       //de otra forma se debe de crear una funcion y utilizarla similar a lo que se hace con useEffect y useState
        <>
            <Label htmlFor="">{label}</Label>
            <Select
                value={state}
                onChange={e => setState(e.target.value)}
            >
                <option value="">-- Seleccione --</option>
                {opciones.map(opcion => (
                        <option
                            key={opcion.id}
                            value={opcion.id}
                        >{opcion.nombre}</option>
                ))}
            </Select>
        </>
  )

  return [state, SelectMonedas]
}

export default useSelectMonedas