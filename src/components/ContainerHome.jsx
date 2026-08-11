import EquipamentoCard from "./EquipamentoCard";
import "./ContainerHome.css";

function ContainerHome({ equipamentos, selectedId, onSelect }) {
  const equipamentosFormatados = equipamentos.map((equipamento) => ({
    id: equipamento.id,
    imagem: equipamento.imagem,
    descricao: equipamento.descricao,
    titulo: equipamento.nome,
    quantidade: equipamento.quantidade,
  }));

  return (
    <div className="ContainerHome">
      {equipamentosFormatados.map((equipamento) => (
        <EquipamentoCard
          key={equipamento.id}
          equipamento={equipamento}
          selected={selectedId === equipamento.id}
          onSelect={() => onSelect(equipamento.id)}
        />
      ))}
    </div>
  );
}

export default ContainerHome;