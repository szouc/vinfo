class Machine {
  constructor(state, effects) {
    this._machineState = state
    this._effects = effects
  }

  // transition state to another state or keep on
  transition(state, action) {
    const currentState = state.currentState
    const nextState = state.states[currentState][action]
      ? state.states[currentState][action]
      : currentState
    return { ...state, currentState: nextState }
  }
  // input the action to transition
  operation(action) {
    this._machineState = this.transition(this._machineState, action)
  }
  // get the current state
  getCurrentState() {
    return this._machineState.currentState
  }
  // output the effect
  getEffect(action) {
    return (...arg) => {
      this.operation(action)
      return this._effects[this._machineState.currentState](...arg)
    }
  }
}

export default Machine
