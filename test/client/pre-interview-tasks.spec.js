import {BowlingGame, BowlingGameConstants} from '../../src/pre-interview-tasks.js';
const {ROLLS_IN_FRAME, BOWLS_IN_FRAME, FRAMES_IN_MATCH, FRAME_TYPES} = BowlingGameConstants

let customGame = (level, x = 0, y = x || 0) => {
  let game = BowlingGame()
  for (let i = 0; i < level; i++) {
    game.roll(x, y)
  };
  return game
}



describe('BowlingGame', () => {
  let game = BowlingGame()

  it('should exist', () => {
    expect(game).to.exist;
  });


  describe('reset', () => {

    it('should reset score to 0', () => {
      expect(BowlingGame().score()).to.be.equal(0);
    });

    let {number, status, isLast} = BowlingGame().frameInfo()

    it('should reset frameInfo().number to 0', () => {
      expect(number).to.be.equal(0);
    });

    it(`should reset frameInfo().status to be ${FRAME_TYPES.common}`, () => {
      expect(status).to.be.equal(FRAME_TYPES.common);
    });

    it('should reset frameInfo().isLast to false', () => {
      expect(isLast).to.be.false;
    });
  }) 



  // describe('incorrect params', () => {
  //   game.reset()

  //   it('should throw an error, if non number arguments providen', () => {
  //     expect(game.roll('2', 2)).to.throw(
  //       new TypeError('incorrect type of param 0: expected "Number", received "String"')
  //     );
  //     expect(game.roll(2, {})).to.throw(
  //       new TypeError('incorrect type of param 1: expected "Number", received "Object"')
  //     );
  //   });

  //   // it(`should throw an error, if more than ${ROLLS_IN_FRAME} params providen to roll method`, () => {
  //   //   expect(game.roll(2,3,4).to.throw(
  //   //     new SyntaxError(
  //   //       `Incorrect number of params providen to "roll" method. 
  //   //       Get ${arguments.length}. Should be ${ROLLS_IN_FRAME}`
  //   //     )
  //   //   ))
  //   // })

  // });


  describe('common roll', () => {

    it(`should switch frame status to ${FRAME_TYPES.common}`, () => {
      expect(BowlingGame().roll(3,2).frameInfo().status).to.be.equal(FRAME_TYPES.common);
    });

    it(`should switch frame number to 1`, () => {
      expect(BowlingGame().roll(3,2).frameInfo().number).to.be.equal(1);
    });
    
    it('should sum score of two rolls', () => {
      expect(BowlingGame().roll(4,5).score()).to.be.equal(4 + 5);
      expect(BowlingGame().roll(1,2).roll(3,4).score()).to.be.equal(1 + 2 + 3 + 4);
    });

  })


  describe('spare roll', () => {

    it(`should switch frame status to ${FRAME_TYPES.common}`, () => {
      expect(BowlingGame().roll(4,6).frameInfo().status).to.be.equal(FRAME_TYPES.spare);
    });

    it('should sum score of two rolls and next roll, if all bowls striked down after 2 frame roll', () => {
      expect(BowlingGame().roll(4,6).roll(3,5).score()).to.be.equal(4 + 6 + 3 * 2 + 5);
    });

    // it(`should provide additional roll in last round`, () => {
    //   game.reset()
    //   game = customGame(FRAMES_IN_MATCH - 1)
    //   expect(game.roll(5,5)).roll(5).to.not.throw;
    // });


  })


  describe('strike roll', () => {

    it(`should switch frame status to ${FRAME_TYPES.strike}`, () => {
      expect(BowlingGame().roll(BOWLS_IN_FRAME).frameInfo().status).to.be.equal(FRAME_TYPES.strike);
    });

    it('should sum score of the roll and next 2 rolls if all bowls striked down after 1 frame roll', () => {
      expect(BowlingGame().roll(BOWLS_IN_FRAME).roll(3,5).score()).to.be.equal(10 + (3 + 5) * 2);
    });

    // it(`should provide 2 additional rolls in last round`, () => {
    //   game.reset()
    //   game = customGame(FRAMES_IN_MATCH - 1)
    //   expect(game.roll(BOWLS_IN_FRAME)).roll(0,0).to.not.throw;
    // });

    // it(`should reach max score 300 if only strikes appears`, () => {
    //   game = customGame(FRAMES_IN_MATCH + 2, BOWLS_IN_FRAME)
    //   expect(game.score()).to.be.equal(300);
    // });

  })


  describe('last frame', () => {
    let lastRoundGame = customGame(FRAMES_IN_MATCH - 1)

    it(`should contain flag isLast`, () => {
      expect(lastRoundGame.frameInfo().isLast).to.be.true;
    });

    it(`should contain flag isLast`, () => {
      expect(lastRoundGame.frameInfo().isLast).to.be.true;
    });
  })

});
