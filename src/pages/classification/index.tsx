import { useState, FormEvent } from 'react';
import Head from "next/head";
import { Header } from '../../components/Header'
import style from './style.module.scss';
import { toast, Zoom } from 'react-toastify';
import { setupAPIClient } from '@/src/services/api';
import { canSSRAuth } from '@/src/utils/canSSRAuth';
import { FiRefreshCcw } from 'react-icons/fi';

type ClassificationProps = {
    id: string;
    team_id: string;
    team_name: string;
    namePlayer: string;
    J: number;
    P: number;
    V: number;
    E: number;
    D: number;
    GP: number;
    GC: number;
    SG: number;
    player_id: string;
}

interface HomeProps {
    classification: ClassificationProps[];
}

export default function Classification({ classification }: HomeProps) {

    const [classificationList, setClassificationrList] = useState(classification || [])

    return (
        <>

            <Head>
                <title>Campeonato - Classificação</title>
            </Head>

            <Header />
            <main className={style.containerMain}>

                <section className={style.container}>

                    <h1>Classificação</h1>

                    <div className={style.containerTable}>
                        <table className={style.table} id="tableClassification">
                            <thead className={style.titleTable}>
                                <tr>
                                <th className={style.titleTableCell}>Posição</th>
                                    <th className={style.titleTableCell}>Time</th>
                                    <th className={style.titleTableCell}>Jogador</th>
                                    <th className={style.titleTableCell}>P</th>
                                    <th className={style.titleTableCell}>V</th>
                                    <th className={style.titleTableCell}>E</th>
                                    <th className={style.titleTableCell}>D</th>
                                    <th className={style.titleTableCell}>GP</th>
                                    <th className={style.titleTableCell}>GC</th>
                                    <th className={style.titleTableCell}>SG</th>
                                </tr>
                            </thead>
                            <tbody className={style.tableBody}>
                                {classificationList.map((item, index) => (
                                    <tr>
                                        <td className={style.body_td}>{index + 1}</td>
                                        <td className={style.body_td}>{item.team_name}</td>
                                        <td className={style.body_td}>{item.namePlayer}</td>
                                        <td className={style.body_td}>{item.P}</td>
                                        <td className={style.body_td}>{item.V}</td>
                                        <td className={style.body_td}>{item.E}</td>
                                        <td className={style.body_td}>{item.D}</td>
                                        <td className={style.body_td}>{item.GP}</td>
                                        <td className={style.body_td}>{item.GC}</td>
                                        <td className={style.body_td}>{item.SG}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </section>
            </main>

        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx: any) => {
    const apliClient = setupAPIClient(ctx)

    const response = await apliClient.get('/classification');

    return {
        props: {
            classification: response.data
        }
    }
})