import { useState, useEffect } from "react";
import { API_URL } from "../config/api";

import "./CreatePartForm.css";

const initialState = {
  code: "",
  part: "",
  categoria: "",
  stock: "",
  grandeza: "",
  price: "",
  location: "",
  status: "Ativo",
};

function CreatePartForm({
  formState,
  setFormState,
  equipamentoId,
  peca,
  onSuccess,
}) {
  const [dados, setDados] = useState(initialState);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!formState) return;
    if (peca) {
      setDados({
        code: peca.codigo ?? "",
        part: peca.nome ?? "",
        categoria: peca.categoria ?? "",
        stock: peca.estoque ?? "",
        grandeza: peca.grandeza ?? "",
        price: peca.preco ?? "",
        location: peca.localizacao ?? "",
        status: peca.status ?? "Ativo",
      });
    } else {
      setDados(initialState);
    }
    setErro("");
  }, [formState, peca]);

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

    const url = peca
      ? `${API_URL}/equip/pecas/${peca.id}`
      : `${API_URL}/equip/pecas`;
    const method = peca ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          equipamento_id: Number(equipamentoId),
          codigo: dados.code,
          nome: dados.part,
          categoria: dados.categoria,
          estoque: Number(dados.stock) || 0,
          grandeza: dados.grandeza,
          preco: Number(dados.price) || 0,
          localizacao: dados.location,
          status: dados.status,
        }),
      });

      if (!response.ok) throw new Error("Erro ao salvar peça.");

      onSuccess?.();
      fecharForm();
    } catch (error) {
      console.error(error);
      setErro("Não foi possível salvar a peça. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div
      className={`create-part-form-container ${formState == true ? "open" : "close"}`}
    >
      <form className="create-part-form" onSubmit={handleSubmit}>
        <button
          type="button"
          className="close-create-part-form"
          onClick={fecharForm}
        >
          X
        </button>

        {erro && <p className="form-erro">{erro}</p>}

        <div className="create-part-group">
          <label htmlFor="code">Código</label>
          <input
            type="text"
            name="code"
            className="create-part-input"
            placeholder="xxx-xxx-xxx"
            value={dados.code}
            onChange={handleChange}
            required
          />
        </div>
        <div className="create-part-group">
          <label htmlFor="part">Peça</label>
          <input
            type="text"
            name="part"
            className="create-part-input"
            placeholder="Nome da peça"
            value={dados.part}
            onChange={handleChange}
            required
          />
        </div>
        <div className="create-part-group">
          <label htmlFor="categoria">Categoria</label>
          <select
            id="categoria"
            name="categoria"
            value={dados.categoria}
            onChange={handleChange}
            required
          >
            <option value="">Selecione uma categoria</option>
            <option value="Vácuo">Vácuo</option>
            <option value="Aquecimento">Aquecimento</option>
            <option value="Sensores">Sensores</option>
            <option value="Segurança">Segurança</option>
            <option value="Controle">Controle</option>
            <option value="Pressão">Pressão</option>
            <option value="Vedação">Vedação</option>
            <option value="Envase">Envase</option>
            <option value="Estrutura">Estrutura</option>
            <option value="Recravação">Recravação</option>
            <option value="Filtragem">Filtragem</option>
            <option value="Elétrica">Elétrica</option>
            <option value="Refrigeração">Refrigeração</option>
            <option value="Ventilação">Ventilação</option>
          </select>
        </div>
        <div className="create-part-group">
          <label htmlFor="stock">Estoque</label>
          <input
            type="number"
            name="stock"
            className="create-part-input"
            placeholder="00"
            value={dados.stock}
            onChange={handleChange}
          />
        </div>
        <div className="create-part-group">
          <label htmlFor="grandeza">Grandeza</label>
          <select
            id="grandeza"
            name="grandeza"
            value={dados.grandeza}
            onChange={handleChange}
          >
            <option value="">Selecione uma grandeza</option>
            <option value="un">un</option>
            <option value="m">m</option>
            <option value="cm">cm</option>
            <option value="L">L</option>
          </select>
        </div>
        <div className="create-part-group">
          <label htmlFor="price">Preço</label>
          <input
            type="number"
            step="0.01"
            name="price"
            className="create-part-input"
            placeholder="0.00"
            value={dados.price}
            onChange={handleChange}
          />
        </div>
        <div className="create-part-group">
          <label htmlFor="location">Localização</label>
          <input
            type="text"
            name="location"
            className="create-part-input"
            placeholder="Ex: D0"
            value={dados.location}
            onChange={handleChange}
          />
        </div>
        <div className="create-part-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={dados.status}
            onChange={handleChange}
          >
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>
        </div>
        <button type="submit" disabled={enviando}>
          {enviando ? "Salvando..." : peca ? "Salvar alterações" : "Enviar"}
        </button>
      </form>
    </div>
  );
}

export default CreatePartForm;
