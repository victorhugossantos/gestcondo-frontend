import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";
import { v4 as uuidv4 } from "uuid";
import { formatarCPF, formatarTelefone } from "../utils/formatters";
import { BuildingOfficeIcon, ChevronDownIcon, Cog6ToothIcon, HomeModernIcon, PencilSquareIcon } from "@heroicons/react/24/outline";


const Unidades = () => {

    const [unidades, setUnidades] = useState([]);
    const [configuracao, setConfiguracao] = useState({
        blocos: 5,
        andares: 2,
        unidadesPorAndar: 4
    });
    
    const [blocoExpandido, setBlocoExpandido] = useState(null)
    const [unidadeEditando, setUnidadeEditando] = useState(null);
    const [modalConfigAberto, setModalConfigAberto] = useState(false);
    const [modalEdicaoAberto, setModalEdicaoAberto] = useState(false);
    const [loading, setLoading] = useState(false);
    const [unidadeDetalhes, setUnidadeDetalhes] = useState(null)

    // persistencia de dados

    // Carregar dados salvos
    useEffect(() => {
        const saved = localStorage.getItem("unidades");
        if (saved) {
            setUnidades(JSON.parse(saved));
        }
    },[]);

    // Salvar dados
    useEffect(() => {
        localStorage.setItem("unidades", JSON.stringify(unidades));
    }, [unidades]);

    const agruparUnidadesPorBloco = () => {
        return unidades.reduce((acc, unidade) => {
            const bloco = unidade.bloco.toString();
            if (!acc[bloco]) {
                acc[bloco] = [];
            }
            acc[bloco].push(unidade);
            return acc;
        }, {});
    };

    const toggleBloco = (bloco) => {
        setBlocoExpandido(bloco === blocoExpandido ? null : bloco);
    }

    const calcularEstatisticasBloco = (unidadesBloco) => {
        return {
            total: unidadesBloco.length,
            ocupadas: unidadesBloco.filter(u => u.proprietario).length,
            disponiveis: unidadesBloco.filter(u => !u.proprietario).length
        };
    };

    const gerarUnidades = () => {

        const novasUnidades = [];

        for(let bloco = 1; bloco <= configuracao.blocos; bloco++) {
            for (let andar = 1; andar <= configuracao.andares; andar++) {
                for (let unidade = 1; unidade <= configuracao.unidadesPorAndar; unidade++) {
                    const identificador = `${bloco}-${andar.toString().padStart(2, "0")}-${unidade.toString().padStart(2, "0")}`;


                    const existe = unidades.some((unidade) => unidade.identificador === identificador);

                    if (!existe) {
                        novasUnidades.push({
                            id: uuidv4(),
                            identificador,
                            bloco,
                            andar,
                            unidade,
                            proprietario: null
                        });
                    }
                }
            }
        }
        setUnidades([...novasUnidades, ...unidades]);
        setModalConfigAberto(false);
    };

    const handleEditarUnidade = (unidade) => {
        setUnidadeEditando(unidade);
        setModalEdicaoAberto(true);
    };

    const handleSalvarUnidade = (e) => {
        e.preventDefault();
        setUnidades(unidades.map(u => u.id === unidadeEditando.id ? unidadeEditando : u));
        setModalEdicaoAberto(false);
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
            <Sidebar />

            <div className="flex-1 p-8 space-y-8">
                {/* Header */}

                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <BuildingOfficeIcon className="w-8 h-8 text-blue-400" />
                        <h2 className="text-2xl font-semibold text-gray-200"> Unidades </h2>
                    </div>
                    <button 
                        onClick={() => setModalConfigAberto(true)}
                        className="bg-blue-600/80 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-all"
                    >
                        <Cog6ToothIcon className="w-6 h-6" />
                        Configurar Unidades
                    </button>
                </div>

                {/* Modal de Configuração */}
                <Modal
                    isOpen={modalConfigAberto}
                    onClose={() => setModalConfigAberto(false)}
                    title="Configurar Unidades"
                    actions= {
                        <>
                            <button
                                type="button"
                                onClick={() => setModalConfigAberto(false)}
                                className="px-6 py-2 text-gray-300 hover:text-gray-200 transition-colors"
                            >
                                Cancelar
                            </button>

                            <button
                                onClick={gerarUnidades}
                                className="bg-blue-600/80 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-all"
                            >
                                Gerar Unidades
                            </button>
                        </>
                    }
                >
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Blocos *</label>
                            <input
                                type="number"
                                min="1"
                                value={configuracao.blocos}
                                onChange={(e) => setConfiguracao({
                                    ...configuracao,
                                    blocos: Math.max(1, parseInt(e.target.value))
                                })}
                                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        
                        <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Andares por bloco *</label>
                            <input
                                type="number"
                                min="1"
                                value={configuracao.andares}
                                onChange={(e) => setConfiguracao({
                                    ...configuracao,
                                    andares: Math.max(1, parseInt(e.target.value))
                                })}
                                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Unidades por andar *</label>
                            <input
                                type="number"
                                min="1"
                                value={configuracao.unidades}
                                onChange={(e) => setConfiguracao({
                                    ...configuracao,
                                    unidades: Math.max(1, parseInt(e.target.value))
                                })}
                                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </Modal>

                {/* Modal de Edição */}
                <Modal
                    isOpen={modalEdicaoAberto}
                    onClose={() => setModalEdicaoAberto(false)}
                    title={`Editando Bloco ${unidadeEditando?.bloco} Unidade ${unidadeEditando?.andar}0${unidadeEditando?.unidade}`}
                    actions={
                        <>
                            <button
                                type="button"
                                onClick={() => setModalEdicaoAberto(false)}
                                className="px-6 py-2 text-gray-300 hover:text-gray-200 transition-colors"
                            >
                                Cancelar
                            </button>

                            <button
                                onClick={handleSalvarUnidade}
                                disabled={loading}
                                className={`bg-blue-600/80 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-all${
                                    loading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                            >
                                {loading ? 'Salvando...' : 'Salvar Alterações'}
                            </button>
                        </>
                    }          
                >
                    <form 
                        id="form-edicao"
                        onSubmit={async (e) => {
                            e.preventDefault();
                            setLoading(true);
                            await new Promise(resolve => setTimeout(resolve, 1000));
                            salvarEdicao(e);
                            setLoading(false);
                        }}
                        className="space-y-4"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 bg-gray-700/20 p-4 rounded-lg">
                                <h4 className="text-sm font-semibold text-blue-400 mb-2">Informações da Unidade</h4>
                                <div className="col-span-2">
                                    <h4 className="text-sm font-semibol text-blue-400 mb-2">Dados do Proprietário</h4>
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-sm text-gray-400 mb-2">Nome Completo</label>
                                    <input 
                                        type="text" 
                                        value={unidadeEditando?.proprietario?.nome || ""}
                                        onChange={(e)=>setUnidadeEditando({
                                            ...unidadeEditando,
                                            proprietario: {
                                                ...unidadeEditando.proprietario,
                                                nome: e.target.value
                                            }
                                        })}
                                        className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"    
                                    />
                                </div>

                                <br />
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-sm text-gray-400 mb-2">Data de Nascimento</label>
                                    <input type="date" 
                                        value={unidadeEditando?.proprietario?.dataNascimento || ""}
                                        onChange={(e)=>setUnidadeEditando({
                                            ...unidadeEditando,
                                            proprietario: {
                                                ...unidadeEditando.proprietario,
                                                 dataNascimento: e.target.value
                                            }
                                        })}
                                        className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <br />
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-sm text-gray-400 mb-2">CPF</label>
                                    <input 
                                        type="text" 
                                        value={formatarCPF(unidadeEditando?.proprietario?.cpf || "")}
                                        onChange={(e)=>setUnidadeEditando({
                                            ...unidadeEditando,
                                            proprietario: {
                                                ...unidadeEditando.proprietario,
                                                cpf: formatarCPF(e.target.value)
                                            }
                                        })}
                                        className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"    
                                    />
                                </div>
                                <br />
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Telefone 1: </label>
                                    <input
                                        type="text"
                                        value={unidadeEditando?.proprietario?.telefone1 || ""}
                                        onChange={(e) => setUnidadeEditando({
                                            ...unidadeEditando,
                                            proprietario: {
                                                ...unidadeEditando.proprietario,
                                                telefone1: formatarTelefone(e.target.value)
                                            }
                                        })}
                                        className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <br />
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Telefone 2: </label>
                                    <input
                                        type="text"
                                        value={unidadeEditando?.proprietario?.telefone2 || ""}
                                        onChange={(e) => setUnidadeEditando({
                                            ...unidadeEditando,
                                            proprietario: {
                                                ...unidadeEditando.proprietario,
                                                telefone2: formatarTelefone(e.target.value)
                                            }
                                        })}
                                        className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <br />
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">E-mail: </label>
                                    <input
                                        type="email"
                                        value={unidadeEditando?.proprietario?.email || ""}
                                        onChange={(e) => setUnidadeEditando({
                                            ...unidadeEditando,
                                            proprietario: {
                                                ...unidadeEditando.proprietario,
                                                email: e.target.value
                                            }
                                        })}
                                        className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>                          
                        </div>

                    </form>

                </Modal>

                {/* Cards de Blocos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(agruparUnidadesPorBloco()).map(([bloco, unidadesBloco]) => {
                        const stats = calcularEstatisticasBloco(unidadesBloco);

                        return (
                            <div
                                key={`bloco-${bloco}`}
                                className="bg-gray-800/50 rounded-lx border border-gray-700/50 shadow-xl cursor-pointer transition-all hover:border-blue-500/50"
                                onClick={() => toggleBloco(bloco)}
                            >
                                <div className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <BuildingOfficeIcon className="w-6 h-6 text-blue-400" />
                                        <h3 className="text-xl font-semibold text-gray-200">Bloco {bloco}</h3>
                                    </div>
                                    <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform ${blocoExpandido === bloco ? 'rotate-180' : '' }`} />
                                </div>

                                {/* Estatisticas dos blocos */}

                                <div className="px-4 pb-4 grid grid-cols-3 gap-2 text-center">
                                    <div className="bg-gray-700/30 p-2 rounded-lg">
                                        <p className="text-sm text-gray-400">Total</p>
                                        <p className="text-blue-400 font-bold">{stats.total}</p>
                                    </div>
                                    <div className="bg-gray-700/30 p-2 rounded-lg">
                                        <p className="text-sm text-gray-400">Ocupadas</p>
                                        <p className="text-blue-400 font-bold">{stats.ocupadas}</p>
                                    </div>
                                    <div className="bg-gray-700/30 p-2 rounded-lg">
                                        <p className="text-sm text-gray-400">Disponíveis</p>
                                        <p className="text-blue-400 font-bold">{stats.disponiveis}</p>
                                    </div>
                                </div>

                                {/* Lista de unidades Expandida */}
                                {blocoExpandido === bloco && (
                                    <div className="border-t border-gray-700/50">
                                        <div className="p-4 space-y-3">
                                            {unidadesBloco
                                                .sort((a, b) => a.andar - b.andar || a.unidade - b.unidade)
                                                .map((unidade) => (
                                                    <div
                                                        key={unidade.id}
                                                        className="flex items-center justify-between p-3 bg-gray-700/20 rounded-lg hover:bg-gray-700/30"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <HomeModernIcon className="w-5 h-5 text-blue-400" />
                                                            <div>
                                                                <p className="text-gray-200">
                                                                {unidade.andar.toString().padStart(1, "0")}{unidade.unidade.toString().padStart(2, "0")}

                                                                </p>
                                                                <p className="text-sm text-gray-400">
                                                                    {unidade.proprietario?.nome || "Disponivel"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleEditarUnidade(unidade);
                                                            }}
                                                            className="p-1 hover:bg-gray-600/50 rounded-lg text-yellow-400 hover:text-yellow-300"
                                                        >
                                                            <PencilSquareIcon className="w-5 h-5" />    
                                                        </button>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Detalhes da Unidade */}
                <Modal
                    isOpen={unidadeDetalhes !== null}
                    onClose={() => setUnidadeDetalhes(null)}
                    title={`Detalhes da Unidade ${unidadeDetalhes?.andar}0${unidadeDetalhes?.unidade}`}
                    actions={
                        <button
                            onClick={() => setUnidadeDetalhes(null)}
                            className="px-6 py-2 bg-gray-600/80 hover:bg-gray-600/90 text-white rounded-lg transition-all"
                        >
                            Fechar
                        </button>
                    }
                >

{unidadeDetalhes && (
            <div className="modal-content space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="info-item">
                  <span className="label">Bloco:</span>
                  <span className="value">{unidadeDetalhes.bloco}</span>
                </div>
                <div className="info-item">
                  <span className="label">Andar:</span>
                  <span className="value">{unidadeDetalhes.andar}º</span>
                </div>
                <div className="info-item">
                  <span className="label">Unidade:</span>
                  <span className="value">{unidadeDetalhes.unidade}</span>
                </div>
              </div>

              {unidadeDetalhes.proprietario ? (
                <div className="bg-gray-700/20 p-4 rounded-lg space-y-3">
                  <h4 className="text-sm font-semibold text-blue-400 mb-2">
                    Dados do Proprietário
                  </h4>
                  <div className="info-item">
                    <span className="label">Nome:</span>
                    <span className="value">
                      {unidadeDetalhes.proprietario.nome}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="label">Data de Nascimento:</span>
                    <span className="value">
                      {unidadeDetalhes.proprietario.dataNascimento}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="label">CPF:</span>
                    <span className="value">
                      {formatarCPF(unidadeDetalhes.proprietario.cpf)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="info-item">
                      <span className="label">Telefone 1:</span>
                      <span className="value">
                        {unidadeDetalhes.proprietario.telefone1 || 'N/A'}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="label">Telefone 2:</span>
                      <span className="value">
                        {unidadeDetalhes.proprietario.telefone2 || 'N/A'}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="label">E-mail:</span>
                      <span className="value">
                        {unidadeDetalhes.proprietario.email || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-700/20 p-4 rounded-lg text-center">
                  <span className="text-yellow-400 text-sm">
                    Unidade Disponível para Venda/Locação
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t border-gray-700/50">
                <span className="label">Status:</span>
                <span className={`status-badge ${
                  unidadeDetalhes.proprietario ? 'active' : 'inactive'
                }`}>
                  {unidadeDetalhes.proprietario ? 'Ocupada' : 'Disponível'}
                </span>
              </div>
            </div>
          )}
                    

                </Modal>
            </div>

        </div>
    )
}


export default Unidades;