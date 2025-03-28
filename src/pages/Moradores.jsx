import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { v4 as uuidv4 } from "uuid";
import {
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon,
  UserCircleIcon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { cpf } from "cpf-cnpj-validator";

const Moradores = () => {
  const [moradores, setMoradores] = useState([]);
  const [novoMorador, setNovoMorador] = useState({
    nome: "",
    bloco: "",
    unidade: "",
    cpf: "",
    dataNascimento: "",
    email: "",
    telefone: "",
  });

  const [editando, setEditando] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  // Carregar e salvar dados

  useEffect(() => {
    const saved = localStorage.getItem("moradores");
    if (saved) {
      setMoradores(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("moradores", JSON.stringify(moradores));
  }, [moradores]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // verificação de cpf valido
    const cpfValido = cpf.isValid(novoMorador.cpf.replace(/\D/g, ""));
    if (!cpfValido) {
        alert("CPF inválido. Por favor, verifique o CPF informado.");
        return;
    }


    // verificar os campos obrigatorios
    const camposObrigatorios = ['nome', 'cpf', 'dataNascimento', 'bloco', 'unidade'];
    const isValid = camposObrigatorios.every(campo => novoMorador[campo].trim() !== '');

    if (!isValid) {
        alert('Por favor, preencha todos os campos obrigatorios (*)')
        return;
    }

    if (editando) {
      // atualiza morador ja existente
      setMoradores(
        moradores.map((morador) =>
          morador.id === editando ? { ...novoMorador, id: editando } : morador
        )
      );
    } else {
      // Criar novo morador
      const moradorCompleto = {
        ...novoMorador,
        id: uuidv4(),
        dataCadastro: new Date().toISOString(),
      };
      setMoradores([moradorCompleto, ...moradores]);
    }

    setNovoMorador({
      nome: "",
      cpf: "",
      dataNascimento: "",
      bloco: "",
      unidade: "",
      email: "",
      telefone: "",
    });
    setEditando(null);
    setModalAberto(false);
  };

  const abrirEdicao = (morador) => {
    setEditando(morador.id);
    setNovoMorador(morador);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setEditando(null);
    setNovoMorador({
      nome: "",
      cpf: "",
      dataNascimento: "",
      bloco: "",
      unidade: "",
      email: "",
      telefone: "",
    });
  };

  const handleDelete = (id) => {
    setMoradores(moradores.filter((m) => m.id !== id));
  };

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const abrirModal = () => {
    setModalAberto(true);
  };

  const formatarCPF = (cpf) => {
    return cpf
        .replace(/\D/g, "") // Remove todos os caracteres não numéricos
        .replace(/(\d{3})(\d)/, "$1.$2") // Adiciona o primeiro ponto
        .replace(/(\d{3})(\d)/, "$1.$2") // Adiciona o segundo ponto
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2") // Adiciona o traço
        .substring(0, 14); // Limita o tamanho a 14 caracteres (incluindo pontos e traço)
  }


  const formatarTelefone = (valor) => {
    return valor
      .replace(/\D/g, "") // Remove todos os caracteres não numéricos
      .replace(/(\d{2})(\d)/, "($1) $2") // Adiciona o parêntese e espaço
      .replace(/(\d{5})(\d)/, "$1-$2") // Adiciona o traço
      .substring(0, 15); // Limita o tamanho a 15 caracteres (incluindo parênteses, espaço e traço)
  }
  




  // Redenrização da pagina
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
      <Sidebar />
      <div className="flex-1 p-8 space-y-8">
        {/* Cabeçalho e Botão */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <UserGroupIcon className="w-8 h-8 text-blue-400" />
            <h1 className="text-2xl font-semibold text-gray-200">Moradores</h1>
          </div>
          <button
            onClick={abrirModal}
            className="bg-blue-600/80 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-all"
          >
            <PlusCircleIcon className="w-5 h-5" />
            Novo Morador
          </button>
        </div>

        {/* Modal */}
        {modalAberto && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800/95 w-full max-w-md rounded-xl border border-gray-700/50 shadow-2xl backdrop-blur-sm">
              <div className="text-gray-400 flex justify-between items-center p-6 border-b border-gray-700/50">
                <h2>
                  {editando ? "Editar Morador" : "Cadastrar novo morador"}
                </h2>
                <button
                  onClick={fecharModal}
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    value={novoMorador.nome}
                    onChange={(e) =>
                      setNovoMorador({ ...novoMorador, nome: e.target.value })
                    }
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                    placeholder="Digite o nome completo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    CPF *
                  </label>
                  <input
                    type="text"
                    value={novoMorador.cpf}
                    onChange={(e) => {
                        const formattedCpf = formatarCPF(e.target.value);
                        setNovoMorador({ ...novoMorador, cpf: formattedCpf });
                        }
                    }
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                    placeholder="Digite o CPF do morador"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Data de Nascimento *
                  </label>
                  <input
                    type="date"
                    value={novoMorador.dataNascimento}
                    onChange={(e) =>
                      setNovoMorador({
                        ...novoMorador,
                        dataNascimento: e.target.value,
                      })
                    }
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                    placeholder="Digite o bloco"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Bloco *
                  </label>
                  <input
                    type="text"
                    value={novoMorador.bloco}
                    onChange={(e) =>
                      setNovoMorador({ ...novoMorador, bloco: e.target.value })
                    }
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                    placeholder="Digite o bloco"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Unidade *
                  </label>
                  <input
                    type="text"
                    value={novoMorador.unidade}
                    onChange={(e) =>
                      setNovoMorador({
                        ...novoMorador,
                        unidade: e.target.value,
                      })
                    }
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                    placeholder="Digite a unidade"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={novoMorador.email}
                    onChange={(e) =>
                      setNovoMorador({ ...novoMorador, email: e.target.value })
                    }
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                    placeholder="Digite o e-mail do morarador"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={novoMorador.telefone}
                    onChange={(e) => {
                        const formattedTelefone = formatarTelefone(e.target.value);
                        setNovoMorador({ ...novoMorador, telefone: formattedTelefone });
                        }
                    }
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                    placeholder="Digite o telefone do morarador"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={fecharModal}
                    className="px-6 py-2 text-gray-300 hover:text-gray-200 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600/80 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-all"
                  >
                    {editando ? "Salvar Alterações" : "Cadastrar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Lista de Moradores */}
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/50">
                <tr>
                  <th className="px-4 py-3 text-sm font-medium text-gray-400">
                    Bloco
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-400">
                    Unidade
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-400">
                    Nome
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-400">
                    CPF
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-400">
                    Nascimento
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-400">
                    E-mail
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-400">
                    Telefone
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {moradores.map((morador) => (
                  <tr
                    key={morador.id}
                    className="hover:bg-gray-700/30 transition-colors"
                  >
                    <td className="px-4 py-3 text-blue-400 font-medium">
                      #{morador.bloco}
                    </td>
                    <td className="px-4 py-3 text-blue-400 font-medium">
                      #{morador.unidade}
                    </td>
                    <td className="px-4 py-3 text-blue-300">{morador.nome}</td>
                    <td className="px-4 py-3 text-blue-300">{morador.cpf}</td>
                    <td className="px-4 py-3 text-blue-300">
                      {formatDate(morador.dataNascimento)}
                    </td>
                    <td className="px-4 py-3 text-blue-300">{morador.email}</td>
                    <td className="px-4 py-3 text-blue-300">
                      {morador.telefone}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => abrirEdicao(morador)}>
                          <PencilSquareIcon className="w-5 h-5 text-yellow-400" />
                        </button>
                        <button onClick={() => handleDelete(morador.id)}>
                          <TrashIcon className="w-5 h-5 text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {moradores.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhum morador cadastrado
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Moradores;
