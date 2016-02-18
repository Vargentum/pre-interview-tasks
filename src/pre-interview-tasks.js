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
    common: 'common',
    last: 'last'
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
  const gameHistory = {
    rolls:   [],
    statuses:[],
    scores:  [],
    total:   []
  }

  const gameLogger = (function() {
    let {rolls, statuses, scores, total} = gameHistory
       ,getMultiplierFrom = (index) => {
          let filtered = statuses.filter((item, idx, log) => {
              return index - idx <= STRIKE_MAX_MULTIPLIER && index - idx > 0
            })
          return filtered.reduce((mlt, status, i, array) => {
              let {strike, spare, common, last} = FRAME_TYPES
              switch (status) {
                case strike: mlt += 2; break
                case spare:  mlt++; break
                case common: mlt > 0 ? mlt-- : 0; break
                case last:   mlt = 0; break
              }
              return mlt
            }, 0)
          }
       ,{strike, spare, common, last} = FRAME_TYPES
       ,logRolls = rls => {
          rolls.push(rls)
          return rls
        }
       ,logStatus = rls => {
          let status;
          switch (true) {
            case rls[0] === BOWLS_IN_FRAME:
              status = strike
              break
            case rls[0] + rls[1] === BOWLS_IN_FRAME:
              status = spare
              break
            case rls[0] + rls[1] < BOWLS_IN_FRAME:
              status = common
              break
            case rls[2]:
              status = last
              break
          }
          statuses.push(status)
          return status
        }
       ,logScore = rls => {
          let score = rolls.reduce((totalScore, rls, idx) => {
            let mlt = getMultiplierFrom(idx)
            return totalScore += rls.reduce((totalRoll, roll) => {
              if (mlt) {
                totalRoll += roll * 2
                mlt--
              }
              else {
                totalRoll += roll
              }
              return totalRoll
            }, 0)
          }, 0)
          scores.push(score)
          return score
        }
       ,log = rls => {
          total.push({
            rolls: logRolls(rls),
            status: logStatus(rls),
            score: logScore(rls),
          })
        }
       ,reset = () => {
          rolls =  []
          status = []
          game =   []
          total =  []
        }
       ,instance = null
       ,createInstance = () => {
         if (!instance) instance = {log, reset}
         return instance
       }

    return createInstance()
  }())
  
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
    gameLogger.log(status)
    score += countScore(rolls, gameLogger.currentMultiplier())
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
        break;
      case sum(rolls) === BOWLS_IN_FRAME:
        status = spare
        break;
      default:
        status = common
        break;
    }
    gameLogger.log(status)
  }

  
  let publicMethods = {
    roll(...rolls) {
      // validateRoll(rolls)
      gameLogger.log(rolls)
      return this
    },
    reset() {
      gameLogger.reset()
      return this
    },
    score() {
      return gameHistory.scores[gameHistory.scores.length - 1] || 0
    }
  }

  return Object.assign({}, publicMethods)
}





export default {BowlingGame, BowlingGameConstants}
