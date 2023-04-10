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
    name: string;
    email: string;
    classifications: {
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
    }[];
    /*     roundsHome: [];
        roundVisiting: []; */
}

interface HomeProps {
    classification: ClassificationProps[];
}

export default function Classification({ classification }: HomeProps) {

    const [classificationList, setClassificationrList] = useState(classification || [])

    return (
        <>

            <Head>
                <title>Campeonato - Usuários</title>
            </Head>

            <Header />
            <body className={style.body}>


                <main className={style.container}>

                    <h1>Usuários</h1>

                    <div className={style.containerTable}>
                        <table className={style.table} id="tableClassification">
                            <thead className={style.titleTable}>
                                <tr>
                                    <th className={style.titleTableCell}>User</th>
                                    <th className={style.titleTableCell}>Email</th>
                                    <th className={style.titleTableCell}>Team</th>
                                    {/* <th className={style.titleTableCell}>Admin?</th> */}
                                    {/* <th className={style.titleTableCell}>CreatedAt</th> */}
                                </tr>
                            </thead>
                            <tbody className={style.tableBody}>
                                {classificationList.map(item => (
                                    <tr>
                                        <td className={style.body_td}>{item.name}</td>
                                        <td className={style.body_td}>{item.email}</td>
                                        <td className={style.body_td}>
                                            {item.classifications.map((classification, index) => (
                                                <span key={index}>{classification.team_name}</span>
                                            ))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </main>
            </body>

        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx: any) => {
    const apliClient = setupAPIClient(ctx)

    const response = await apliClient.get('/users');

    return {
        props: {
            classification: response.data
        }
    }
})