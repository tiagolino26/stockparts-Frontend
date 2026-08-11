import { useState } from "react";
import IconLupa from "../assets/icon/lupa.png";
import "./ContainerEquipamentos.css";

function ContainerEquipamentos({ equipamento, selectedPecaId, onSelectPeca }) {
  const [busca, setBusca] = useState("");

  const pecasFiltradas = equipamento?.pecas.filter(
    (p) =>
      p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      p.codigo.toLowerCase().includes(busca.toLowerCase()),
  );

  const total = (equipamento?.pecas ?? []).reduce(
    (soma, p) => soma + p.preco,
    0,
  );

  return (
    <section id="container-equipamentos">
      <div className="container-equipamentos-head">
        <div className="input-container">
          <img src={IconLupa} alt="Lupa" className="input-container-icon" />
          <input
            className="input"
            type="text"
            placeholder="Buscar peça, código"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>        
      </div>

      <div className="container-equipamentos-body">
        <div className="table-scroll">
          <table>
            <thead className="table-head">
              <tr>
                <th></th>
                <th>Código</th>
                <th>Peça</th>
                <th>Categoria</th>
                <th>Estoque</th>
                <th>Grandeza</th>
                <th>Preço Unit.</th>
                <th>Localização</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {pecasFiltradas?.map((p) => (
                <tr key={p.id}>
                  <td>
                    <input
                      type="radio"
                      checked={selectedPecaId === p.id}
                      onChange={() => onSelectPeca(p.id)}
                    />
                  </td>
                  <td className="code">{p.codigo}</td>
                  <td>{p.nome}</td>
                  <td>{p.categoria}</td>
                  <td>{p.estoque}</td>
                  <td>{p.grandeza}</td>
                  <td>
                    {p.preco.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td>{p.localizacao}</td>
                  <td>{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="container-equipamentos-footer">
          <span>
            {pecasFiltradas?.length == 1
              ? `${pecasFiltradas?.length} resultado`
              : `${pecasFiltradas?.length} resultados`}
          </span>
          <span>
            Valor filtrado:{" "}
            {total.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      </div>
    </section>
  );
}

export default ContainerEquipamentos;
