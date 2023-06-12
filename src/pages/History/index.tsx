import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../context/CyclesContext";
import {formatDistanceToNow} from 'date-fns';
import ptBR from "date-fns/locale/pt-BR";

export function History(){
  const { cycles } = useContext(CyclesContext)
  return(
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <th>Tarefa</th>
            <th>Duração</th>
            <th>Início</th>
            <th>Status</th>
          </thead>
          <tbody>
              {cycles.map(cycle => {
                return(
                  <tr key={cycle.id}>
                    <td>{cycle.task}</td>
                    <td>{cycle.minutes} minutos</td>
                    <td>{formatDistanceToNow(cycle.dateStart, {addSuffix: true, locale: ptBR})}</td>
                    <td>
                      {cycle.finishDate && <Status statusColor="green">Concluído</Status>}
                      {cycle.interruptDate && <Status statusColor="red">Interrompido</Status>}
                      {!cycle.finishDate && !cycle.interruptDate && <Status statusColor="yellow">Em andamento</Status>}
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}