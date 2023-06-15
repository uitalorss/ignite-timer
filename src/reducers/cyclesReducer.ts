import { ActionTypes } from "./actions";

export interface Cycle {
  id: string;
  task: string;
  minutes: number;
  dateStart: Date;
  interruptDate?: Date;
  finishDate?: Date;
}

interface CyclesState {
  cycles: Cycle[];
  activateCycleId: string | null;
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch(action.type){
    case ActionTypes.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activateCycleId: action.payload.newCycle.id
      };
    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map(cycle => {
          if(cycle.id === state.activateCycleId){
            return {...cycle, interruptDate: new Date()}
          } else{
            return cycle;
          }
        }),
        activateCycleId: null
      }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      return {
        ...state,
        cycles: state.cycles.map(cycle => {
          if(cycle.id === state.activateCycleId){
            return {...cycle, finishDate: new Date()}
          }else{
            return cycle;
          }
        }),
        activateCycleId: null
      }
    default:
      return state;
  }
}