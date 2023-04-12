import { useContext, FormEvent, useState, useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image';
//import $ from 'jquery';
import 'select2';
import 'select2/dist/css/select2.min.css';
import styles from '../../../styles/home.module.scss';
import { toast } from 'react-toastify';
//import logoImg from '../../../public/logo.svg';
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/Button'
import { AuthContext } from '../../context/AuthContext';
import Link from 'next/link';
import { canSSRGuest } from '@/src/utils/canSSRGuest';
import { setupAPIClient } from '@/src/services/api';

declare global {
    interface JQuery {
        select2(): JQuery;
        select2(options?: any): JQuery;
    }
}

type TeamsProps = {
    id: string;
    name: string;
    select: boolean;
}

interface TeamListProps {
    teamList: TeamsProps[];
}

export default function SignUp({ teamList }: TeamListProps) {

    const { signUp } = useContext(AuthContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [team, setTeams] = useState(teamList || [])
    const [teamSelected, setTeamSelected] = useState<number>(0);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const $select = $('.form-control')
        $select.select2()
        $select.on('select2:select', (event: any) => {
            setTeamSelected(event.params.data.id)
        })
    }, [teamList])

    function handleChangeTeam(event: any) {
        setTeamSelected(event.target.value)
    }

    async function handleSingUp(event: FormEvent,) {

        event.preventDefault();

        if (name === '' || email === '' || password === '') {
            toast.error('Preencha todos os campos!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
            return;
        }

        let data = {
            name,
            email,
            password,
            team: team[teamSelected].name
        }

        //console.log(data);

        await signUp(data);

        setLoading(false)
    }

    return (
        <>
            <Head>
                <title>Faça seu cadastro agora!</title>
            </Head>
            <main className={styles.containerMain}>
                {/* <Image src={logoImg} alt="Logo Sujeito Pizzaria" /> */}

                <div className={styles.login}>
                    <h1>Criando sua conta</h1>

                    <form onSubmit={handleSingUp}>
                        <Input
                            placeholder="Digite seu nome"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <Input
                            placeholder="Digite seu email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                            placeholder="Sua senha"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <label className={styles.labelTeam}>Escolha seu time</label>
                        <select className='form-control' value={teamSelected} name="state" onChange={handleChangeTeam}>
                            {team.map((item, index) => {
                                return (
                                    <option key={item.id} value={index}>
                                        {item.name}
                                    </option>
                                )
                            })}
                        </select>

                        <Button
                            type="submit"
                            loading={loading}
                        >
                            Cadastrar
                        </Button>
                    </form>

                    <Link href="/" legacyBehavior>
                        <p className={styles.text}>Já possui uma conta? Faça login!</p>
                    </Link>

                </div>
            </main>
        </>
    )
}

export const getServerSideProps = canSSRGuest(async (ctx: any) => {
    const apliClient = setupAPIClient(ctx)

    const response = await apliClient.get('/teams');

    return {
        props: {
            teamList: response.data
        }
    }
})
