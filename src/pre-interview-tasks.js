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
  const defaultState = {
    score: 0,
    frameInfo: {
      number: 0,
      status: FRAME_TYPES.common,
      isLast: false
    }
  }
  let state = Object.create(defaultState)
  let sum = nums => nums.reduce((p, n) => p += n, 0)
  let isValidRoll = (...rolls) => true //TODO
  let updateScore = ({score, frameInfo}, rolls) => {
    let {status} = frameInfo
    let {strike, spare, common} = FRAME_TYPES
    switch (status) {
      case strike: score += sum(rolls) * 2
      break
      case spare:  score += sum(rolls) + rolls[0]
      break
      case common: score += sum(rolls)
      break
    }
    return {score}
  }
  let updateFrameNumber = ({number, isLast}) => {
    if (number < FRAMES_IN_MATCH) ++number
    isLast = number === FRAMES_IN_MATCH
    return {number, isLast}
  }
  let updateFrameStatus = ({status}, rolls) => {
    let {strike, spare, common} = FRAME_TYPES
    if (rolls[0] === BOWLS_IN_FRAME) status = strike
    else if (sum(rolls) === BOWLS_IN_FRAME) status = spare
    else status = common
    return {status}
  }

  let publicMethods = {
    roll(...rolls) {
      if (isValidRoll(rolls)) {
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
      }
      else {
        throw new Error('Invalid Roll, try another params')
      }
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
