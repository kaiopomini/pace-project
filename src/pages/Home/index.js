import React, { useState, useEffect } from 'react'
import Ad from 'react-google-publisher-tag'

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


    useEffect(() => {
        installGoogleAds()

    }, []);




    const [kms, setKms] = useState('')
    const [horas, setHoras] = useState('')
    const [minutos, setMinutos] = useState('')
    const [segundos, setSegundos] = useState('')
    const [pace, setPace] = useState('')


    function checkErrors() {
        let check = false
        let erro = ''
        if (typeof(kms) == 'string' || kms <= 0 ){
            erro += 'Informe uma distância válida! '
            check = true
            
        } 

        if ((horas + minutos + segundos <= 0)) {
            check = true
            erro += 'Informe um tempo válido! '
        }
        
        return({check, erro})
    }

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

    function addZero(tempo) {
        console.log(tempo)
        let horas, minutos, segundos
        if (tempo.horas.toFixed(0) < 10) {
            horas = `0${tempo.horas.toFixed(0)}`
        } else {
            horas = tempo.horas.toFixed(0)
        }
        if (tempo.minutos.toFixed(0) < 10) {
            minutos = `0${tempo.minutos.toFixed(0)}`
        } else {
            minutos = tempo.minutos.toFixed(0)
        }
        if (tempo.segundos.toFixed(0) < 10) {
            segundos = `0${tempo.segundos.toFixed(0)}`
        } else {
            segundos = tempo.segundos.toFixed(0)
        }

        return ({ horas, minutos, segundos })
    }



    function calcPaceMinPerKm(dados) {
        let paceEmSegundos = tempoParaSegundos(dados) / parseFloat(dados.kms)
        let tempo = segundosParaTempo(paceEmSegundos)
        let tempoComZeros = addZero(tempo)
     
        if (tempo.horas > 0) {
            return (`${tempoComZeros.horas}h:${tempoComZeros.minutos}m:${tempoComZeros.segundos}s por Kilometro`)

        }
        return (`${tempoComZeros.minutos}m:${tempoComZeros.segundos}s por Kilometro`)

    }

    function handleCalcPace(e) {
        e.preventDefault()
        if (horas === '') setHoras(0)
        if (minutos === '') setMinutos(0)
        if (segundos === '') setSegundos(0)
        const dados = {
            kms, horas, minutos, segundos
        }
        console.log(dados)
        console.log(typeof(dados.kms))
        console.log(typeof(dados.horas))
        console.log(typeof(dados.minutos))
        console.log(typeof(dados.segundos))


        if (!checkErrors().check) {
            setPace(calcPaceMinPerKm(dados))
        } else {
            setPace(checkErrors().erro)
        }
        

        

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
                            <input type="number" precision={2} placeholder="KMs" value={kms}
                                onChange={e => setKms(parseFloat(e.target.value))} />

                            <p>Informe o tempo:</p>
                            <div className="tempo">
                                <input type="number" placeholder="H" min="0" value={horas}
                                    onChange={e => setHoras(parseFloat(e.target.value))} />

                                <input type="number" placeholder="Min" min="0" max="59" value={minutos}
                                    onChange={e => setMinutos(parseFloat(e.target.value))} />

                                <input type="number" placeholder="S" min="0" max="59" value={segundos}
                                    onChange={e => setSegundos(parseFloat(e.target.value))} />

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
                <h1>Sobre a corrida:</h1>

                <p>A corrida é uma das formas mais primitivas de exercício, e pode ser praticada por qualquer pessoa saudável, sendo que pode ser realizada tanto  ao ar livre, quanto na esteira.</p>
                <p>Há quem acredite que a corrida é o mais democrático dos esportes por causa de sua praticidade: no geral, com um tênis e uma roupa confortável já é possível arriscar os primeiros passos. E, além de ser simples de se iniciar, a corrida ainda oferece uma série de vantagens para seus praticantes, tanto para a saúde física quanto a mental.</p>
                <p>Correr sem preocupar-se com tempo é bom, mas para quem quer evoluir no esporte, entender seu pace é fundamental. Ele é o ritmo médio de um corredor em determinado trajeto, medido em minutos por quilômetro. Dessa forma, para calcular o pace basta dividir o tempo gasto para percorrer uma distância.</p>

                <h2>Como saber seu desempenho:</h2>

                <p>O desempenho na corrida pode ser aferido de acordo com a velocidade que você corre, conhecida como pace. Há várias maneiras de verificar o seu pace, uma delas é utilizando a calculadora.</p>
                <p>Informando a distância percorrida e o tempo gasto para completar a distância você terá o valor de quanto tempo gasta para completar 1KM.</p>
                <p>Com esse valor obtido você pode começar a obsevar a velocidade dos trechos percorridos e tentar manter esse valor, ou até mesmo melhorar suas marcas.</p>
                <p>Portanto o pace nada mais é do que o ritimo de corrida, para quem busca melhorar a performance na corrida, quanto mais baixo o pace, melhor é.</p>

                <h2>Benefícios da corrida:</h2>

                <p>A pratica regular da corrida sem dúvida pode trazer inúmeros benefícios para sua saúde.</p>
                <p>Contudo é recomendável antes de iniciar a pratica consultar um médico cardiologista para fins de verificar se possui algum impedido para a pratica, visto que a corrida em casos de pressão arterial alta, arritmia entre outros distúrbios/doenças não é recomendada, por isso de suma importância.</p>
                <p>Você também pode buscar grupos de corrida da sua cidade, pois é muito mais divertido e motivador, correr em grupo ou em companhia de alguém do que sozinho quando se está começando.</p>
                <p>Muitos tem buscado a corrida com objetivos diferente com emagrecer, aumentar a resistência e a qualidade de vida entre outros, e sem dúvidas um acompanhamento com um profissional habilitado em educação física, pode ajudar a chegar mais rápido ao seu objetivo e prevenir lesões.</p>

                <h2>Dentre os benefícios da corrida podemos citar:</h2>
                <ul>
                    <li>Acelera o metabolismo</li>
                    <li>Reduz o peso corporal</li>
                    <li>Aumenta a capacidade cardiorrespiratória</li>
                    <li>Melhora o nível de colesterol</li>
                    <li>Previne contra doenças cardíacas</li>
                    <li>Melhora no condicionamento físico</li>
                    <li>Diminui o estresse e a ansiedade</li>
                    <li>Melhora a qualidade do sono</li>
                    <li>Aumento das funções cardiorrespiratórias</li>
                    <li>Músculos tonificados</li>
                    <li>Melhora a circulação sanguínea</li>
                    <li>Melhora o humor</li>
                    <li>Reduz os riscos de infarto</li>
                    <li>Proporciona sensação de bem-estar</li>

                </ul>


                <p>O tempo e a frequência da corrida vai depender da capacidade de cada um, o importante é não exagerar, respeitando sempre as suas limitações, e se possível fazer acompanhamento com um profissional habilitado.</p>
                <p>Calcular e acompanhar o seu pace, serve de motivação a cada crescimento, ajuda a planejar os treinos e traçar metas para suas próximas corridas.</p>
                <p>É de suma importância para a pratica da corrida adquirir um tênis adequado e ter os músculos/ossos bem fortalecidos especialmente para evitar lesões, portanto a pratica de exercícios de fortalecimento é fundamental para o seu crescimento e, também é muito importante fazer alongamento e além disso beber muita água para manter o corpo hidratado e cuidar da alimentação.</p>
                <p>Não se esqueça, é de grande importancia ter um acompanhamento proficional para a prática de qualquer esporte físico, até a corrida! Então não deixe de procurar um profissional para te acompanhar nessa jornada.</p>

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