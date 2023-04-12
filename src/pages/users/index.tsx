import { useState } from 'react';
import Head from "next/head";
import { Header } from '../../components/Header'
import style from './style.module.scss';
import { setupAPIClient } from '@/src/services/api';
import { canSSRAuth } from '@/src/utils/canSSRAuth';


type UserProps = {
    id: string;
    name: string;
    email: string;
    teamName: string;
}

interface HomeProps {
    users: UserProps[];
}

export default function Users({ users }: HomeProps) {

    const [userList, setUserrList] = useState(users || [])

    return (
        <>

            <Head>
                <title>Campeonato - Usuários</title>
            </Head>

            <Header />



            <main className={style.containerMain}>

                <section className={style.container}>

                    <h1>Usuários</h1>

                    <div className={style.containerTable}>
                        <table className={style.table} id="tableUser">
                            <thead className={style.titleTable}>
                                <tr>
                                    <th className={style.titleTableCell}>User</th>
                                    <th className={style.titleTableCell}>Email</th>
                                    <th className={style.titleTableCell}>Team</th>
                                </tr>
                            </thead>
                            <tbody className={style.tableBody}>
                                {userList.map(item => (
                                    <tr>
                                        <td className={style.body_td}>{item.name}</td>
                                        <td className={style.body_td}>{item.email}</td>
                                        <td className={style.body_td}>{item.teamName}</td>
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

    const response = await apliClient.get('/users');

    return {
        props: {
            users: response.data
        }
    }
})