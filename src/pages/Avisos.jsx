import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { v4 as uuidv4 } from 'uuid';
import { DocumentPlusIcon, MegaphoneIcon } from '@heroicons/react/24/outline';

const Avisos = () => {
  const [avisos, setAvisos] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [showAlert, setShowAlert] = useState(false)
  const [descricao, setDescricao] = useState('');

  // Persistencia de dados temporario no localStorage
  useEffect(() => {
    const saved = localStorage.getItem('avisos');
    if (saved) {
      setAvisos(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('avisos', JSON.stringify(avisos))
  }, [avisos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (titulo && descricao) {
      const novoAviso = {
        id: uuidv4(),
        titulo,
        descricao,
        data: new Date().toISOString()
      }
      setAvisos([novoAviso, ...avisos]);
      setTitulo('');
      setDescricao('');
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false)
      }, 3000)
    }
  };

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString('pt-BR', {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };


  return (
    <div className='flex min-h-screen bg-gradient-to-br from-gray-800 to-gray-900'>
      <Sidebar />

      {/* Conteudo principal */}

      <div className='flex-1 p-8 space-y-8'>
        {/* Card de Novo aviso*/}

        <div className='bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 shadow-2xl'>
          <div className='flex items-center gap-3 mb-6'>
            <MegaphoneIcon className='w-8 h-8 text-blue-400 '/>
            <h2 className='text-2xl font-semibold text-gray-200'>Novo Aviso</h2>
          </div>

          <form className='space-y-5' onSubmit={handleSubmit}>
            <div>
              <label className='block text-md font-medium text-gray-400 mb-2'>
                Titulo
              </label>
              <input 
                type='text'
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className='w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500'
                placeholder='Digite o titulo do aviso'  
              />
            </div>
            <div>
              <label className="block text-md font-medium text-gray-400 mb-2">
                Descrição
              </label>
              <textarea 
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                rows="4"
                className='w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transpartent placeholder-grey-500'
                placeholder='Digite o aviso com detalhes...'
              />
              <br /> <br />
              <button
                type='submit'
                className='w-full bg-blue-600/80 hover:bg-blue-600 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all font-medium'
              >
                <DocumentPlusIcon className='w-5 h-5' />
                Publicar Aviso
              </button>
            </div>
          </form>
        </div>

        {/* Lista de Avisos */}

        <div className='bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 shadow-2xl'>
          <div className='flex items-center gap-3 mb-6'>
            <MegaphoneIcon className='w-8 h-8 text-blue-400 '/>
            <h2 className='text-2xl font-semibold text-gray-200'>Avisos Recentes</h2>
          </div>

          {avisos.length === 0 ? (
            <div className='text-center py-8 text-gray-500'>
              Nenhum aviso cadastrado
            </div>
          ): (
            <div className='space-y-4'>
              {avisos.map((aviso) => (
                <div
                  key={aviso.id}
                  className='group bg-gray-700/30 hover:bg-gray-700/50 p-5 rounded-lg border-l-4 border-blue-500/80 transition-all cursor-pointer'
                >
                  <div className='flex justify-between items-start mb-2'>
                    <h3 className='text-lg font-semibold text-gray-200'>
                      {aviso.titulo}
                    </h3>
                    <span className='text-xs text-gray-400'>
                      {formatDate(aviso.data)}
                    </span>
                  </div> 
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {aviso.descricao}
                  </p>
                  
                </div>
              ))}
            </div>
          )}

          {showAlert && (
            <div className='fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in'>
              Aviso publicado com sucesso!
            </div>
          )}  
        </div>

      </div>
    </div>
  )
}


export default Avisos;