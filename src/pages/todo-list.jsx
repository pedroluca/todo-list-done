import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Trash2, Check, LogOut } from 'lucide-react'
import Button from '../components/button'
import Input from '../components/input'

export default function TodoList() {
  const [usuario, setUsuario] = useState('')
  const [itens, setItens] = useState([])
  const [novoItem, setNovoItem] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const usuarioStorage = localStorage.getItem('usuario')
    if (!usuarioStorage) {
      navigate('/entrar')
      return
    }
    setUsuario(usuarioStorage)

    const itensStorage = localStorage.getItem('itens')
    if (itensStorage) {
      setItens(JSON.parse(itensStorage))
    }
  }, [navigate])

  useEffect(() => {
    if (usuario) {
      localStorage.setItem('itens', JSON.stringify(itens))
    }
  }, [itens, usuario])

  const adicionarTodo = (e) => {
    e.preventDefault()
    if (novoItem.trim()) {
      const novo = {
        id: Date.now(),
        texto: novoItem.trim(),
        concluido: false
      }
      setItens([...itens, novo])
      setNovoItem('')
    }
  }

  const toggleTodo = (id) => {
    setItens(itens.map(todo =>
      todo.id === id ? { ...todo, concluido: !todo.concluido } : todo
    ))
  }

  const removerTodo = (id) => {
    setItens(itens.filter(todo => todo.id !== id))
  }

  const handleLogout = () => {
    localStorage.removeItem('usuario')
    localStorage.removeItem('itens')
    navigate('/entrar')
  }

  return (
    <div className="todo-container">
      <div className="todo-header">
        <div>
          <h1>Olá, {usuario}!</h1>
          <p>Organize suas tarefas</p>
        </div>
        <button onClick={handleLogout} className="logout-btn" title="Sair">
          <LogOut size={20} />
        </button>
      </div>

      <form onSubmit={adicionarTodo} className="todo-form">
        <Input
          type="text"
          placeholder="Adicionar nova tarefa..."
          value={novoItem}
          onChange={(e) => setNovoItem(e.target.value)}
        />
        <Button type="submit">
          <Plus size={20} />
        </Button>
      </form>

      <div className="todo-list">
        {itens.length === 0 ? (
          <p className="empty-message">Nenhuma tarefa adicionada ainda.</p>
        ) : (
          itens.map(todo => (
            <div key={todo.id} className={`todo-item ${todo.concluido ? 'concluido' : ''}`}>
              <button
                className="todo-check"
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.concluido && <Check size={16} />}
              </button>
              <span className="todo-texto">{todo.texto}</span>
              <button
                className="todo-delete"
                onClick={() => removerTodo(todo.id)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
