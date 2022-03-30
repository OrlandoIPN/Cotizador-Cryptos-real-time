import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas';
import { monedas } from '../data/monedas' //llaves por que es un objeto
import Err from './Err';

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`;

const Formulario = ({setMonedas}) => {

    const [criptos, setCriptos] = useState([])
    const [error, setError] = useState(false)
    //se pueden llamar como sea pero lo que respeta es el array index , en este caso moneda hace
    //referencia al state
    const [moneda, SelectMonedas] = useSelectMonedas('Elge tu moneda', monedas);
    const [criptomoneda, SelectCriptomoneda] = useSelectMonedas('Elge tu Criptomoneda', criptos);


    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
            const respuesta = await fetch(url);
            const resultado = await respuesta.json()
            const arrayCriptos = resultado.Data.map(cripto => {

                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName,
                }

                return objeto //es para que retorne este arreglo
            })

            setCriptos(arrayCriptos)
        }

        consultarAPI();
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        // Includes : incluye un string vacio
        if ([moneda, criptomoneda].includes('')) {
            setError(true)
            return
        }

        setError(false)
        setMonedas({
            moneda,
            criptomoneda
        })
    }

    return (
        <>
            
            {error && <Err>Todos los campos son obligatorios </Err>}
            <form
                onSubmit={handleSubmit}
            >

                <SelectMonedas />
                <SelectCriptomoneda />
                <InputSubmit
                    type="submit"
                    value="Cotizar"
                />
            </form>
        </>
    )
}

export default Formulario