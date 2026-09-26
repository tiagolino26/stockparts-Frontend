import ContainerEquipamentos from "../components/ContainerEquipamentos";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CreatePartForm from "../components/CreatePartForm";
import Footer from "../components/Footer";
import HeaderEquipamentos from "../components/HeaderEquipamentos";
import { authFetch } from "../config/api";

import "./EquipamentoPage.css";

function EquipamentoPage() {
  const { id } = useParams();
  const [formState, setFormState] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [equipamento, setEquipamento] = useState(null);
  const [selectedPecaId, setSelectedPecaId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    async function buscarEquipamento() {
      try {
        const response = await authFetch("/equip/getAllEquip");
        if (!response.ok) throw new Error("Erro ao buscar equipamentos.");
        const equipamentos = await response.json();
        setEquipamento(equipamentos.find((e) => e.id === Number(id)));
      } catch (error) {
        console.error("Erro:", error);
      }
    }
    buscarEquipamento();
  }, [id, refreshKey]);

  const selectedPeca =
    equipamento?.pecas.find((p) => p.id === selectedPecaId) || null;

  function abrirCriar() {
    setFormMode("create");
    setSelectedPecaId(null);
    setFormState(true);
  }

  function abrirEditar() {
    if (!selectedPeca) return alert("Selecione uma peça para editar.");
    setFormMode("edit");
    setFormState(true);
  }

  async function excluirSelecionada() {
    if (!selectedPeca) return alert("Selecione uma peça para excluir.");
    if (!confirm(`Excluir a peça "${selectedPeca.nome}"?`)) return;

    try {
      const response = await authFetch(`/equip/pecas/${selectedPeca.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Erro ao excluir peça.");
      setSelectedPecaId(null);
      setRefreshKey((k) => k + 1);
    } catch (error) {
      console.error(error);
      alert("Não foi possível excluir a peça.");
    }
  }

  return (
    <>
      <CreatePartForm
        formState={formState}
        setFormState={setFormState}
        equipamentoId={id}
        peca={formMode === "edit" ? selectedPeca : null}
        onSuccess={() => setRefreshKey((k) => k + 1)}
      />
      <HeaderEquipamentos
        equipamento={equipamento}
        onAdd={abrirCriar}
        onEdit={abrirEditar}
        onDelete={excluirSelecionada}
      />
      <ContainerEquipamentos
        equipamento={equipamento}
        selectedPecaId={selectedPecaId}
        onSelectPeca={(pid) =>
          setSelectedPecaId(pid === selectedPecaId ? null : pid)
        }
      />
      <Footer />
    </>
  );
}

export default EquipamentoPage;
