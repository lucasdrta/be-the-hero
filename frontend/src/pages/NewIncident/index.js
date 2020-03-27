import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import logoImg from '../../assets/logo.svg'

import './styles.css'

export default function NewIncident() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')

  const history = useHistory()
  const ongId = localStorage.getItem('ongId')

  async function handleNewIncident(e) {
    e.preventDefault()

    const data = {
      title,
      description,
      value
    }

    try {
      await api.post('incidents', data, {
        headers: {
          authorization: ongId
        }
      })

      history.push('/profile')
    } catch (err) {
      alert('Erro ao cadastrar caso, tente novamente')
    }
  }

  return (
    <div className="new-incident-container">
      <div className="container">
        <section>
          <img src={logoImg} alt="Be The Hero"/>

          <h1>Cadastro novo caso</h1>
          <p>Descreva o casp detalhadamente para encontrar um heroi para resolver isso</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041"/>
            Voltar para a home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input 
            placeholder="Titulo"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea 
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input 
            placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <button type="submit" className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}
