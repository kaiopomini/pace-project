import React, { useState, useEffect } from 'react'
import Ad from 'react-google-publisher-tag'
import Cookies from 'universal-cookie';
import AdSense from 'react-adsense';


import './styles.css'

export default function Home() {

    const installGoogleAds = () => {
        const head = document.querySelector("head")
        const script = document.createElement("script")

        script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        script.async = true
        script.setAttribute("data-ad-client", "ca-pub-9656826245200965")

        head.appendChild(script)
    }

    const setCookies = () => {
        const cookies = new Cookies();
        cookies.set('cross-site', 'name', { path: '/' });
        cookies.set('SameSite', 'None', { path: '/' });
        console.log(cookies)
    }

    useEffect(() => {
        installGoogleAds()
        setCookies()
    }, []);




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

        if (totalSegundos < 60) {
            horas = 0
            minutos = 0
            segundos = totalSegundos


        } else if (totalSegundos < 60 * 60) {
            minutos = parseInt(totalSegundos / 60)
            segundos = totalSegundos - (minutos * 60)
            horas = 0

        } else {
            horas = parseInt(totalSegundos / (60 * 60))
            resto = totalSegundos - (horas * 60 * 60)
            minutos = parseInt(resto / 60)
            segundos = resto - (minutos * 60)

        }

        return { horas, minutos, segundos }
    }



    function calcPaceMinPerKm(dados) {
        let paceEmSegundos = tempoParaSegundos(dados) / parseFloat(dados.kms)
        let tempo = segundosParaTempo(paceEmSegundos)

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
                            <h1>Calculadora de PACE (Min/KM)</h1>
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

                <div className="content">



                    {/* <Ad path="/ca-pub-9656826245200965/7704093721" /> */}
                    <AdSense.Google
                        client='ca-pub-9656826245200965'
                        slot='7704093721'
                  
                        style={{ width: 300, height: 300, float: 'left' }}
                        format=''
                    />

                    {/* <section className="form">
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

                    </section> */}


                </div>

            </div>
            <div className="result">
                <p className="resultado">{pace}</p>
            </div>
            <div className="content-info">
                <h1>Benefícios da corrida</h1>
                <p>Há quem acredite que a corrida é o mais democrático dos esportes por causa de sua praticidade: no geral, com um tênis e uma roupa confortável já é possível arriscar os primeiros passos. E, além de ser simples de se iniciar, a corrida ainda oferece uma série de vantagens para seus praticantes, tanto para a saúde física quanto a mental.</p>
                <p>Correr sem preocupar-se com tempo é bom, mas para quem quer evoluir no esporte, entender seu pace é fundamental. Ele é o ritmo médio de um corredor em determinado trajeto, medido em minutos por quilômetro. Dessa forma, para calcular o pace basta dividir o tempo gasto para percorrer uma distância.</p>
                <h2>Como saber seu desempenho?</h2>
                <p>O desempenho na corrida pode ser aferido de acordo com a velocidade que você corre, conhecida como <strong>pace</strong>. Há várias maneiras de verificar o seu pace, uma delas é utilizando a <strong>calculadora</strong>.</p>
                <p>Informando a distância percorrida e o tempo gasto para completar a distância você terá o valor de quanto tempo gasta para completar 1KM.</p>
                <p>Com esse valor obtido você pode começar a obsevar a velocidade dos trechos percorridos e tentar manter esse valor, ou até mesmo melhorar suas marcas.</p>

            </div>
            <div className="ads">
                {/* <Ad path="/ca-pub-9656826245200965/5453334906" /> */}
                <AdSense.Google
                    client='ca-pub-9656826245200965'
                    slot='5453334906'
                    
                    style={{ width: 728, height: 90, display: 'inline-block' }}
                    format=''
                />

            </div>
        </div>

    )
}