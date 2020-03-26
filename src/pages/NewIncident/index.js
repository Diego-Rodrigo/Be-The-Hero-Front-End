import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import LogoImg from '../../assets/logo.svg';

import './styles.css';

export default function NewIncident(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    
    const history = useHistory();
    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e){
        e.eventDefault();

        const data = {
            title,
            description,
            value,
        };
        try {
        await api.post('incidents', data, {
            headers: {
                Authorization: ongId,
            }

        })
            history.push('/profile');
            
        } catch (error) {
            alert('Ops! Erro ao cadastrar caso! Tente novamente!');   
        }

    }
    
    return(
        <div className="new-incident-ontainer">

            <div className="content">
                <section>
                    <img src={LogoImg} alt="Be The Heroe"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>
                        Descreva o caso detalhadamente para encontrar um heroi para resolver isso.
                    </p>

                    <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#E02041" />
                    Voltar para Home
                </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Titulo do Caso"
                        value={title}
                        onChange = {e => setTitle(e.target.value)}
                        />
                    <textarea  
                        placeholder="Descriçao"
                        value={description}
                        onChange = {e => setDescription(e.target.value)}
                        />
  
  
                    <input 
                        placeholder="Valor em Reais"
                        value={value}
                        onChange = {e => setValue(e.target.value)}
                        />

                    
                    <button className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    )

}