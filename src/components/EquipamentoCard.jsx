import { useNavigate } from "react-router-dom";
import "./EquipamentoCard.css";

function EquipamentoCard({ equipamento, selected, onSelect }) {
  const navigateCard = useNavigate();

  return (
    <div
      className={`card ${selected ? "card-selected" : ""}`}
      onClick={() => navigateCard(`/equipamento/${equipamento.id}`)}
    >
      <div className="card-head">
        <div className="gradient" />
        <input
          type="radio"
          className="card-radio"
          checked={!!selected}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            e.stopPropagation();
            onSelect();
          }}
        />
        <img className="card-img" src={equipamento.imagem} alt={equipamento.titulo} />
        <h3 className="card-title">{equipamento.titulo}</h3>
      </div>
      <div className="card-body">
        <p className="card-description">{equipamento.descricao}</p>
        <div className="card-info">
          <h2 className="card-info-title">Quantidade:</h2> {equipamento.quantidade}
        </div>
      </div>
    </div>
  );
}

export default EquipamentoCard;