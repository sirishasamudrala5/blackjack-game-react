import GameLogic from './GameLogic';

const gl = new GameLogic();


// won = 1 -> player won
// won = 2 -> dealer won
// won = 3 -> Tie

test('getPlayerTotal', () => {
  let playerCards = [{Value: "A"},
                    {Value: "A"},
                    {Value: "Q"},
                    {Value: "3"},
                    {Value: "6"},
                    ]
  let res = gl.getPlayerTotal(playerCards)
  expect(res.playerTotal).toBe(21);
});

test('getDealerTotal', () => {
  let dealerCards = [{Value: "A"}, {Value: "A"}, {Value: "Q"}, {Value: "3"}, {Value: "6"}]
  let res = gl.getDealerTotal(dealerCards)
  expect(res.dealerTotal).toBe(21);
});

test('who won - if player got 21', () => {
  let playerCards = [{Value: "A"}, {Value: "A"}, {Value: "Q"}, {Value: "3"}, {Value: "6"}]
  let dealerCards = [{Value: "7"}, {Value: "2"}]

  let pTotal = gl.getPlayerTotal(playerCards)
  let dTotal = gl.getDealerTotal(dealerCards)

  let winner = gl.whoWon(pTotal.playerTotal, dTotal.dealerTotal, playerCards.length)
  expect(winner.won).toBe(1);
})

test('who won - if player stays at 19 and dealer got 18', () => {
  let playerCards = [{Value: "10"}, {Value: "8"}, {Value: "A"}]
  let dealerCards = [{Value: "10"}, {Value: "8"}]

  let pTotal = gl.getPlayerTotal(playerCards)
  let dTotal = gl.getDealerTotal(dealerCards)

  let winner = gl.whoWon(pTotal.playerTotal, dTotal.dealerTotal, playerCards.length)
  expect(winner.won).toBe(1);
})

test('who won - if player got 21 on load', () => {
  let playerCards = [{Value: "10"}, {Value: "A"}]
  let dealerCards = [{Value: "10"}, {Value: "2"}]

  let pTotal = gl.getPlayerTotal(playerCards)
  let dTotal = gl.getDealerTotal(dealerCards)

  let winner = gl.whoWon(pTotal.playerTotal, dTotal.dealerTotal, playerCards.length)
  expect(winner.won).toBe(4);
})

test('who won - if player got 19 and chose to stay and dealer got 18', () => {
  let playerCards = [{Value: "K"}, {Value: "9"}]
  let dealerCards = [{Value: "K"}, {Value: "8"}]

  let pTotal = gl.getPlayerTotal(playerCards)
  let dTotal = gl.getDealerTotal(dealerCards)

  let winner = gl.whoWon(pTotal.playerTotal, dTotal.dealerTotal, playerCards.length)
  expect(winner.won).toBe(1);
})

test('who won - if player got A,5,6 ', () => {
  let playerCards = [{Value: "A"}, {Value: "5"}, {Value: "6"}]
  let dealerCards = [{Value: "5"}, {Value: "3"}]

  let pTotal = gl.getPlayerTotal(playerCards)
  let dTotal = gl.getDealerTotal(dealerCards)

  let winner = gl.whoWon(pTotal.playerTotal, dTotal.dealerTotal, playerCards.length)
  expect(winner.won).toBe(0);
})

// TODO: write testcases with hit & stay logic