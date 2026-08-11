import { useNavigate } from "react-router-dom";
import IconLessThan from "../assets/icon/less-than.png";
import "./HeaderEquipamentos.css";

function HeaderEquipamentos({ equipamento, onAdd, onEdit, onDelete }) {
  const navigate = useNavigate();

  return (
    <>
      <header className="cabecalho-equipamentos">
        <div className="cabecalho-equipamentos-maquina">
          <div>
            <button className="btn-equipamentos" onClick={() => navigate("/")}>
              <img
                src={IconLessThan}
                alt="icon"
                className="btn-equipamentos-icon"
              />
              Equipamentos
            </button>
          </div>
          <div className="description-equipamentos">
            <h3>{equipamento?.nome}</h3>
            <p>{equipamento?.descricao}</p>
          </div>
        </div>
        <div className="equipament-actions-container">
          <button className="equipament-action" onClick={onAdd}>
            {" "}
            + Nova Peça
          </button>
          <button className="equipament-action" onClick={onEdit}>
            {" "}
            Editar Peça
          </button>
          <button className="equipament-action" onClick={onDelete}>
            {" "}
            Excluir Peça
          </button>
        </div>
      </header>
      <div className="titulo-decription">
        <div className="titulo-decription-head">
          <span>estoque de peças</span>
          <h4>{equipamento?.nome}</h4>
          <p>{equipamento?.descricao}</p>
        </div>
        <div className="titulo-decription-body">
          <div className="titulo-decription-item">
            <span>{equipamento?.pecas.length}</span>
            <p>Total de Peças</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderEquipamentos;
