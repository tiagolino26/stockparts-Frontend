import HeaderHome from "../components/HeaderHome";
import { useState, useEffect } from "react";
import ContainerHome from "../components/ContainerHome";
import Footer from "../components/Footer";
import CreateEquipamentForm from "../components/CreateEquipamentForm";
import { authFetch } from "../config/api";

import "./HomePage.css";

function HomePage() {
  const [equipmentFormState, setEquipmentFormState] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [equipamentos, setEquipamentos] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    async function buscarEquipamentos() {
      try {
        const response = await authFetch("/equip/getAllEquip");
        if (!response.ok) throw new Error("Erro ao buscar equipamentos");
        setEquipamentos(await response.json());
      } catch (error) {
        console.error(error);
      }
    }
    buscarEquipamentos();
  }, [refreshKey]);

  const selectedEquipamento =
    equipamentos.find((e) => e.id === selectedId) || null;

  function abrirCriar() {
    setFormMode("create");
    setSelectedId(null);
    setEquipmentFormState(true);
  }

  function abrirEditar() {
    if (!selectedEquipamento)
      return alert("Selecione um equipamento para editar.");
    setFormMode("edit");
    setEquipmentFormState(true);
  }

  async function excluirSelecionado() {
    if (!selectedEquipamento)
      return alert("Selecione um equipamento para excluir.");
    if (!confirm(`Excluir o equipamento "${selectedEquipamento.nome}"?`))
      return;

    try {
      const response = await authFetch(`/equip/${selectedEquipamento.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Erro ao excluir equipamento.");
      setSelectedId(null);
      setRefreshKey((k) => k + 1);
    } catch (error) {
      console.error(error);
      alert("Não foi possível excluir o equipamento.");
    }
  }

  return (
    <>
      <CreateEquipamentForm
        formState={equipmentFormState}
        setFormState={setEquipmentFormState}
        equipamento={formMode === "edit" ? selectedEquipamento : null}
        onSuccess={() => setRefreshKey((k) => k + 1)}
      />
      <HeaderHome
        onAdd={abrirCriar}
        onEdit={abrirEditar}
        onDelete={excluirSelecionado}
      />
      <div className="titulo">
        <h5>GESTÃO DE EQUIPAMENTOS</h5>
        <h1>Selecione um Equipamento</h1>
        <p>
          Acesse o controle de estoque de peças de cada equipamento. Gerencie
          quantidades, cadastre novas peças e consulte QR codes.
        </p>
      </div>
      <div className="descricao">
        <div className="descricao-caixa"></div>
      </div>
      <ContainerHome
        equipamentos={equipamentos}
        selectedId={selectedId}
        onSelect={(id) => setSelectedId(id === selectedId ? null : id)}
      />
      <Footer />
    </>
  );
}

export default HomePage;
