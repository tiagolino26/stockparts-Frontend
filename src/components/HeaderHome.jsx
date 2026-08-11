import CubeIcon from "../assets/icon/logo-cube.svg";
import "./HeaderHome.css";

function HeaderHome({ onAdd, onEdit, onDelete }) {
  return (
    <header className="cabecalho">
      <div className="logo">
        <div>
          <img src={CubeIcon} alt="logo" />
        </div>
        <div className="logo-text">
          <h3>StockParts</h3>
          <p>
            <span>Controle de estoque</span>
          </p>
        </div>
      </div>
      <div className="criar">
        <h3>Criar Equipamento</h3>
        <div className="div-btn">
          <button className="btn-add" onClick={onAdd}>
            Adicionar
          </button>
          <button className="btn-add" onClick={onEdit}>
            Editar
          </button>
          <button className="btn-add" onClick={onDelete}>
            Excluir
          </button>
        </div>
      </div>
    </header>
  );
}

export default HeaderHome;
