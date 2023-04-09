import { useState, FormEvent } from 'react';
import Head from "next/head";
import { Header } from '../../components/Header'
import style from './style.module.scss';
import { toast, Zoom } from 'react-toastify';
import { setupAPIClient } from '@/src/services/api';
import { canSSRAuth } from '@/src/utils/canSSRAuth';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type ClassificationProps = {
    id: string;
    roundNumber: number;
    homePlayer_id: string;
    homePlayer: string;
    scoreHome: number;
    scoreVisiting: number;
    visitingPlayers_id: string;
    visitingPlayers: string;
    disabledInputs: boolean;
}

interface HomeProps {
    rounds: ClassificationProps[];
}

export default function Classification({ rounds }: HomeProps) {

    const [roundsList, setRoundsList] = useState(rounds || [])

    return (
        <>

            <Head>
                <title>Campeonato - Classificação</title>
            </Head>

            <div>
                <Header />

                <main className={style.container}>

                    <form className={style.main}>
                        <h2>Rodada 1 de 38</h2>
                        <div className={style.grid}>

                            <div className={style.teste}>
                                <div className={style.flex}>
                                    <h5>Time Mandante</h5>
                                    <h3>palmeiras</h3>
                                    <hr />
                                    <h5>Time Visitante</h5>
                                    <h3>santos</h3>
                                </div>

                                <div>
                                    <div className={style.salvar}>palmeiras</div>
                                </div>
                            </div>


                            <div className={style.teste}>
                                teste
                            </div>

                            <div className={style.teste}>
                                teste
                            </div>

                            <div className={style.teste}>
                                teste
                            </div>

                            <div className={style.teste}>
                                teste
                            </div>

                            <div className={style.teste}>
                                teste
                            </div>
                            <div className={style.teste}>
                                teste
                            </div>
                            <div className={style.teste}>
                                teste
                            </div>
                            <div className={style.teste}>
                                teste
                            </div>
                            <div className={style.teste}>
                                teste
                            </div>
                        </div>

                    </form>

                    {/*                     <div className={style.containerTable}>
                        <table className={style.table} id="tableClassification">
                            <thead className={style.titleTable}>
                                <tr>
                                    <th className={style.titleTableCell}>Rodada</th>
                                    <th className={style.titleTableCell}>Player Mandante</th>
                                    <th className={style.titleTableCell}>Placar Mandante</th>
                                    <th className={style.titleTableCell}>X</th>
                                    <th className={style.titleTableCell}>Placar Visitante</th>
                                    <th className={style.titleTableCell}>Player Visitante</th>
                                    <th className={style.titleTableCell}>Acão</th>
                                </tr>
                            </thead>
                            <tbody className={style.tableBody}>
                                {roundsList.map(item => (
                                    <tr>
                                        <td className={style.body_td_round}>{item.roundNumber}</td>
                                        <td className={style.body_td}>{item.homePlayer}</td>
                                        <td className={style.body_td}>{item.scoreHome}</td>
                                        <td className={style.body_td}>X</td>
                                        <td className={style.body_td}>{item.scoreVisiting}</td>
                                        <td className={style.body_td}>{item.visitingPlayers}</td>
                                        <td className={style.body_td}><button className={style.buttonSave} type='button'><FontAwesomeIcon icon={faFloppyDisk} /></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div> */}

                </main>
            </div>

        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx: any) => {
    const apliClient = setupAPIClient(ctx)

    const response = await apliClient.get('/round');

    console.log(response.data);


    return {
        props: {
            rounds: response.data
        }
    }
})