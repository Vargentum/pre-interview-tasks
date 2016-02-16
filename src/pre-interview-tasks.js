/**
 * preInterviewTasks
 * Description
 *
 * @name preInterviewTasks
 * @function
 * @param {Array} data An array of data
 * @param {Object} options An object containing the following fields:
 *
 * @return {Array} Result
 */




const BowlingGameConstants = {
  ROLLS_IN_FRAME: 2,
  BOWLS_IN_FRAME: 10,
  FRAMES_IN_MATCH: 10,
  FRAME_TYPES: {
    strike: 'strike',
    spare:  'spare',
    common: 'common'
  }
}


function BowlingGame () {
  const {ROLLS_IN_FRAME, BOWLS_IN_FRAME, FRAMES_IN_MATCH, FRAME_TYPES} = BowlingGameConstants
  const GameErrors = {
    ROLL_AFTER_STRIKE: SyntaxError("You can't roll after strike"),
    TO_MUCH_ROLLS: SyntaxError(`Too much rolls. Provide ${ROLLS_IN_FRAME} rolls or ${ROLLS_IN_FRAME + 1} if round is last.`)
  }
  const defaultState = {
    score: 0,
    frameInfo: {
      number: 0,
      status: FRAME_TYPES.common,
      isLast: false
    }
  }
  const defaultPrivateState = {
    strikeMultiplier: 0,
    validRoll: null
  }
  let state = Object.create(defaultState)
  let privateState = Object.create(defaultPrivateState)

  let sum = nums => nums.reduce((p, n) => p += n, 0)
  let validateRoll = (...rolls) => {
    let {isLast} = state.frameinfo
    if (rolls[0] === BOWLS_IN_FRAME && rolls.length > 1) {
      throw new GameErrors.ROLL_AFTER_STRIKE
    }
    else if ((rolls.length > ROLLS_IN_FRAME && !isLast) || (rolls.length > ROLLS_IN_FRAME + 1 && isLast)) {
      throw new GameErrors.TO_MUCH_ROLLS
    }
  }
  let updateScore = ({score, frameInfo}, rolls) => {
    let {status} = frameInfo
    let {strike, spare, common} = FRAME_TYPES
    switch (true) {
      case status === strike || privateState.strikeMultiplier: //! 
        score += sum(rolls) * 2
        privateState.strikeMultiplier--
      break
      case status === spare:  score += sum(rolls) + rolls[0]
      break
      case status === common: score += sum(rolls)
      break
    }
    return {score}
  }
  let updateFrameNumber = ({number, isLast}) => {
    if (number < FRAMES_IN_MATCH) number++
    isLast = number === FRAMES_IN_MATCH
    return {number, isLast}
  }
  let updateFrameStatus = ({status}, rolls) => {
    let {strike, spare, common} = FRAME_TYPES
    switch (true) {
      case rolls[0] === BOWLS_IN_FRAME:
        status = strike
        privateState.strikeMultiplier++  
        break;
      case sum(rolls) === BOWLS_IN_FRAME:
        status = spare
        break;
      default:
        status = common
        break;
    }
    return {status}
  }

  let publicMethods = {
    roll(...rolls) {
      validateRoll(rolls)
      let frameInfo = Object.assign(
        {},
        updateFrameNumber(state.frameInfo, rolls),
        updateFrameStatus(state.frameInfo, rolls)
      )
      state = Object.assign(
        state,
        updateScore(state, rolls),
        {frameInfo}
      )
      return this
    },
    reset() {
      state = Object.assign({}, defaultState)
      return this
    },
    score() {
      return state.score
    },
    frameInfo() {
      return state.frameInfo
    }
  }

  return Object.assign({}, publicMethods)
}





export default {BowlingGame, BowlingGameConstants}
