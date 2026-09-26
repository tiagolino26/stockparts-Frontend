import CubeIcon from "../assets/icon/logo-cube.svg";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./HeaderHome.css";

function HeaderHome({ onAdd, onEdit, onDelete }) {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

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
      <div className="btn-equip">
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
        <div className="usuario-area">
          {usuario && <span className="usuario-nome">{usuario.nome}</span>}
          <button className="btn-sair" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}

export default HeaderHome;
