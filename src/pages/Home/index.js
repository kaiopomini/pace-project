import React, { useState } from 'react'
import AdSense from 'react-adsense';

import './styles.css'

export default function Home() {

    const [kms, setKms] = useState('')
    const [horas, setHoras] = useState('')
    const [minutos, setMinutos] = useState('')
    const [segundos, setSegundos] = useState('')
    const [pace, setPace] = useState('')

    function tempoParaSegundos(dados) {
        let horas = dados.horas * 60 * 60
        let minutos = dados.minutos * 60
        let segundos = dados.segundos * 1
        let resultado = horas + minutos + segundos
        return resultado

    }
    function segundosParaTempo(totalSegundos) {
        let horas, minutos, segundos, resto
        console.log('segundosParaTempo(totalSegundos)', totalSegundos)
        if (totalSegundos < 60) {
            horas = 0
            minutos = 0
            segundos = totalSegundos
            console.log('<60')

        } else if (totalSegundos < 60 * 60) {
            minutos = parseInt(totalSegundos / 60)
            segundos = totalSegundos - (minutos * 60)
            horas = 0
            console.log('<60*60')
        } else {
            horas = parseInt(totalSegundos / (60 * 60))
            resto = totalSegundos - (horas * 60 * 60)
            minutos = parseInt(resto / 60)
            segundos = resto - (minutos * 60)
            console.log('else')
        }

        return { horas, minutos, segundos }
    }



    function calcPaceMinPerKm(dados) {
        let paceEmSegundos = tempoParaSegundos(dados) / parseFloat(dados.kms)
        let tempo = segundosParaTempo(paceEmSegundos)
        console.log('teste', parseFloat(dados.kms))
        console.log('dados', tempoParaSegundos(dados))
        console.log('tempo em segundos', paceEmSegundos)
        console.log('segundos para tempo', tempo)
        return (`${tempo.minutos.toFixed(0)}:${tempo.segundos.toFixed(0)}/Minutos por Kilometro`)
    }

    function handleCalcPace(e) {
        e.preventDefault()

        const dados = {
            kms, horas, minutos, segundos
        }

        setPace(calcPaceMinPerKm(dados))

    }
    return (
        <div>
            {/* <section class="cabecalho">


                <nav class="menu">
                    <ul>
                        <li>
                            <a href="#inicio">Início</a>
                        </li>
                        <li>
                            <a href="#cursos">Cursos</a>
                        </li>
                        <li>
                            <a href="#sobre">Sobre</a>
                        </li>
                        <li>
                            <a href="#contato">Contato</a>
                        </li>
                    </ul>
                </nav>

            </section> */}
            <div className="home-container">
                <div className="content">
                    <section className="form">
                    <form onSubmit={handleCalcPace}>
                            <h1>Calculadoda de PACE (Min/KM)</h1>
                            <p>Distância Percorrida (KM)</p>
                        <input placeholder="KMs" value={kms}
                                    onChange={e => setKms(e.target.value)} />
                     
                            <p>Informe o tempo:</p>
                            <div className="tempo">
                                
                                    <input type="number" placeholder="HRs" min="0" value={horas}
                                        onChange={e => setHoras(e.target.value)} />

                                    <input type="number" placeholder="Min" min="0" max="59" value={minutos}
                                        onChange={e => setMinutos(e.target.value)} />

                                    <input type="number" placeholder="Sec" min="0" max="59" value={segundos}
                                        onChange={e => setSegundos(e.target.value)} />
                                
                            </div>


                            <button className="button" type="submit">Calcular</button>
                        </form>



                    </section>
                </div>

                {/* <div className="content">
                    <section className="form">
                        <form onSubmit={handleCalcPace}>
                            <h1>
                                informe os dados de sua corrida
                    </h1>
                        <p>Distância Percorrida (KM)</p>
                        <input placeholder="KMs" value={kms}
                                    onChange={e => setKms(e.target.value)} />
                           
                            <p>Informe o tempo:</p>
                            <div className="tempo">
                                
                                    <input type="number" placeholder="HRs" min="0" value={horas}
                                        onChange={e => setHoras(e.target.value)} />

                                    <input type="number" placeholder="Min" min="0" max="59" value={minutos}
                                        onChange={e => setMinutos(e.target.value)} />

                                    <input type="number" placeholder="Sec" min="0" max="59" value={segundos}
                                        onChange={e => setSegundos(e.target.value)} />
                                
                            </div>


                            <button className="button" type="submit">Calcular</button>
                        </form>

                    </section>


                </div> */}

            </div>
            <div className="result">
                <p className="resultado">{pace}</p>
            </div>
        </div>
    )
}