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
  STRIKE_MAX_MULTIPLIER: 2,
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
  const {STRIKE_MAX_MULTIPLIER, ROLLS_IN_FRAME, BOWLS_IN_FRAME, FRAMES_IN_MATCH, FRAME_TYPES} = BowlingGameConstants
  const GameErrors = {
    ROLL_AFTER_STRIKE:  new SyntaxError("You can't roll after strike"),
    TO_MUCH_ROLLS:      new SyntaxError(`Too much rolls. Provide ${ROLLS_IN_FRAME} rolls or ${ROLLS_IN_FRAME + 1} if round is last.`),
    INVALID_ROLL_TYPE:  new TypeError(`Invalid roll type. Must be a non-float number.`),
    INVALID_ROLL_VALUE: new TypeError(`Invalid roll value. Must be from 0 to ${BOWLS_IN_FRAME}.`), 
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
  
  let validateRoll = (rolls) => {
    let {isLast} = state.frameInfo
    let {length} = rolls
    let isntValidType = num => !(num === 0 || typeof num === 'number' && num % Math.floor(num) === 0)
    let isntValidVal = num => !(num >= 0 && num <= BOWLS_IN_FRAME)

    if ((rolls[0] === BOWLS_IN_FRAME && length > 1 && !isLast) || (rolls[0] === BOWLS_IN_FRAME && length > 3 && isLast)) {
      throw GameErrors.ROLL_AFTER_STRIKE
    }
    else if ((length > ROLLS_IN_FRAME && !isLast) || (length > ROLLS_IN_FRAME + 1 && isLast)) {
      throw GameErrors.TO_MUCH_ROLLS
    }
    else if (rolls.some(isntValidType)) {
      throw GameErrors.INVALID_ROLL_TYPE
    }
    else if (rolls.some(isntValidVal)) {
      throw GameErrors.INVALID_ROLL_VALUE
    }
  }

  let updateScore = ({score, frameInfo}, rolls) => {
    let {status, isLast} = frameInfo
    let {strike, spare, common} = FRAME_TYPES
    let reduceStrikeMultiplier = () => privateState.strikeMultiplier <= 0 ? 0 : --privateState.strikeMultiplier
    switch (true) {
      case status === strike || privateState.strikeMultiplier && !isLast:
        debugger
        score += sum(rolls) * (2 + privateState.strikeMultiplier)
      break
      case status === spare && !isLast:
        score += sum(rolls) + rolls[0]
        reduceStrikeMultiplier()
      break
      case status === common && !isLast:
        score += sum(rolls)
        reduceStrikeMultiplier()
      case isLast === true:
        score += sum(rolls)
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
        if (privateState.strikeMultiplier < STRIKE_MAX_MULTIPLIER ) {
          privateState.strikeMultiplier++ 
        }
        debugger
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
