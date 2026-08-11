import { useState, useEffect } from "react";
import { API_URL } from "../config/api";

import "./CreateEquipamentForm.css";

const initialState = {
  nome: "",
  descricao: "",
  imagem: "",
  quantidade: "",
  status: "",
};

function CreateEquipamentForm({
  formState,
  setFormState,
  equipamento,
  onSuccess,
}) {
  const [dados, setDados] = useState(initialState);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!formState) return;
    if (equipamento) {
      setDados({
        nome: equipamento.nome ?? "",
        descricao: equipamento.descricao ?? "",
        imagem: equipamento.imagem ?? "",
        quantidade: equipamento.quantidade ?? "",
        status: equipamento.status ?? "",
      });
    } else {
      setDados(initialState);
    }
    setErro("");
  }, [formState, equipamento]);

  function handleChange(e) {
    const { name, value } = e.target;
    setDados((prev) => ({ ...prev, [name]: value }));
  }

  function fecharForm() {
    setFormState(false);
    setErro("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setEnviando(true);
    setErro("");

    const url = equipamento
      ? `${API_URL}/equip/${equipamento.id}`
      : `${API_URL}/equip/create`;
    const method = equipamento ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: dados.nome,
          descricao: dados.descricao,
          imagem: dados.imagem,
          quantidade: Number(dados.quantidade) || 0,
          status: dados.status,
        }),
      });

      if (!response.ok) throw new Error("Erro ao salvar equipamento.");

      onSuccess?.();
      fecharForm();
    } catch (error) {
      console.error(error);
      setErro("Não foi possível salvar o equipamento. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div
      className={`create-equipment-form-container ${formState == true ? "open" : "close"}`}
    >
      <div className="create-equipment-form">
        <form onSubmit={handleSubmit}>
          <button
            type="button"
            className="close-create-equipment-form"
            onClick={fecharForm}
          >
            X
          </button>

          {erro && <p className="form-erro">{erro}</p>}

          <div className="create-equipment-group">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              className="create-equipment-input"
              placeholder="Nome do equipamento"
              value={dados.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div className="create-equipment-group">
            <label htmlFor="descricao">Descrição</label>
            <textarea
              id="descricao"
              name="descricao"
              className="create-equipment-input"
              placeholder="Descrição do equipamento"
              value={dados.descricao}
              onChange={handleChange}
              required
            />
          </div>
          <div className="create-equipment-group">
            <label htmlFor="imagem">Imagem</label>
            <input
              type="text"
              id="imagem"
              name="imagem"
              className="create-equipment-input"
              placeholder="URL da imagem"
              value={dados.imagem}
              onChange={handleChange}
            />
          </div>
          <div className="create-equipment-group">
            <label htmlFor="quantidade">Quantidade</label>
            <input
              type="number"
              id="quantidade"
              name="quantidade"
              className="create-equipment-input"
              placeholder="00"
              min="0"
              value={dados.quantidade}
              onChange={handleChange}
            />
          </div>
          <div className="create-equipment-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              className="create-equipment-input"
              value={dados.status}
              onChange={handleChange}
            >
              <option value="" disabled>
                Selecione um status
              </option>
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </div>

          <button type="submit" disabled={enviando}>
            {enviando
              ? "Salvando..."
              : equipamento
                ? "Salvar alterações"
                : "Enviar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEquipamentForm;
