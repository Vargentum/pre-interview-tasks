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
  STRIKE_MAX_MLT: 2,
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
  const {STRIKE_MAX_MLT, ROLLS_IN_FRAME, BOWLS_IN_FRAME, FRAMES_IN_MATCH, FRAME_TYPES} = BowlingGameConstants
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
    total:   [],
  }
  const gameMultiplier = {
    mlt: [0, 0],
    strikeMlt: 0,
    strikeRoundUpdate() {
      if (this.mlt.filter(x => x === 1).length === this.mlt.length) {
        this.strikeMlt = 1
      }
      this.mlt = [1, 1]
    },
    spareRoundUpdate() {
      this.mlt = [1, 0]
      this.strikeMlt = 0
    },
    reset() {
      this.mlt = [0, 0]
      this.strikeMlt = 0
    }
  }
  const getLastFrom = src => src[src.length - 1]
  const gameLogger = (function() {
    let {rolls, statuses, scores, total} = gameHistory
       ,{strike, spare, common, last} = FRAME_TYPES
       ,logRolls = rls => {
          rolls.push(rls)
          return rls
        }
       ,updateMultipliers = () => {
          switch(getLastFrom(statuses)) {
            case last:
              gameMultiplier.reset()
              break
            case strike:
              gameMultiplier.strikeRoundUpdate()
              break
            case spare:
              gameMultiplier.spareRoundUpdate()
              break
            case common:
              gameMultiplier.reset()
              break
          }
        }
       ,logStatus = rls => {
          let status;
          switch (true) {
            case rolls.length === FRAMES_IN_MATCH:
              status = last
              debugger
              break
            case rls[0] === BOWLS_IN_FRAME:
              status = strike
              break
            case rls[0] + rls[1] === BOWLS_IN_FRAME:
              status = spare
              break
            case rls[0] + rls[1] < BOWLS_IN_FRAME:
              status = common
              break
          }
          statuses.push(status)
          return status
        }
       ,logScore = rls => {
          let score = rls.reduce((scr, roll, i) => {
            if (getLastFrom(statuses) === last) {
              scr += roll  
            } else {
              scr += roll + roll * gameMultiplier.mlt[i] + roll * gameMultiplier.strikeMlt  
            }
            return scr
          }, 0)
          scores.push(score)
          return score
        }
       ,log = rls => {
          // order is important!
          updateMultipliers()
          let stage = {
            rolls: logRolls(rls),
            status: logStatus(rls)
          }
          if (getLastFrom(statuses) === last) {
            updateMultipliers()  
          } 
          stage.scores = logScore(rls)         
          total.push(stage)
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
      return gameHistory.scores.reduce((p, n) => p += n, 0)
    }
  }

  return Object.assign({}, publicMethods)
}





export default {BowlingGame, BowlingGameConstants}
