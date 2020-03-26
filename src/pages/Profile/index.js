import React, {useState,useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import LogoImg from '../../assets/logo.svg';
import api from '../../services/api';
import './styles.css';


export default function Profile (){
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();
    const ongId = localStorage.getItem('ong_Id');
    const ongName = localStorage.getItem('ongName');

    useEffect(() => {
        api.get('profile', {
        headers: {

            Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    },[ongId]);

    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/ ${id}`, {
            headers: {
                Authorization: ongId,
                }
           });
           setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (error) {
            alert("Erro ao deletar");   
        }        
    }
    
    function handleLogout(){
        localStorage.clear();

        history.push('/');
    }

    return(
        <div className="profile-container">
            <header >
                <img src={LogoImg} alt=" Be The Hero"/>

                     <span>Bem vinda, {ongName} </span>

                     <Link className="button" to="/incident/new">Cadastrar novo caso</Link>

                     <button onClick={handleLogout} type="button">
                         <FiPower size={18} color="#e02041" />
                     </button>
            </header>

            <h1>Casos Cadastrado</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                    <strong>CASO:{incident.id}</strong>
                    <p>{incident.title}</p>

                    <strong>DESCRIÇAO</strong>
                     <p>{incident.description}</p>

                    <strong>VALOR</strong>
                <p> {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                    <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>
                ))}
                

                                
            </ul>
        </div>
    )
}