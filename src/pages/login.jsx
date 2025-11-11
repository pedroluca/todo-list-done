import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from 'lucide-react'
import Button from '../components/button'
import Input from '../components/input'

export default function Login() {
  const [nome, setNome] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (nome.trim()) {
      localStorage.setItem('usuario', nome.trim())
      navigate('/')
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-icon">
          <User size={48} />
        </div>
        <h1>Bem-vindo!</h1>
        <p>Digite seu nome para continuar</p>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            autoFocus
          />
          <Button type="submit">Continuar</Button>
        </form>
      </div>
    </div>
  )
}
