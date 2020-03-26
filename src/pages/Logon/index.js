import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import LogoImg from '../../assets/logo.svg';
import HeroesImg from '../../assets/heroes.png';

export default function Logon(){

    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('sessions', {id});

            localStorage.setItem('ong_Id', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');

        }catch (err){
            alert('Falha no Login. Tente novamente!');
        }
    }

    return(
    <div className="logon-container">
        <section className="form">

            <img src={LogoImg} alt ="Be The Heroes"/>

            <form onSubmit={handleLogin}>
                <h1>Faca seu Login</h1>
                <input 
                placeholder="Seu ID"
                value={id}
                onChange={e => setId(e.target.value)}
                />
                <button className="button" type="submit">Entrar</button>

                <Link className="back-link" to="/register">
                    <FiLogIn size={16} color="#E02041" />
                    Não tenho cadastro
                </Link>
            </form>
        </section>


        <img src={HeroesImg} alt ="Be The Heroes"/>
    </div>    
    );
}