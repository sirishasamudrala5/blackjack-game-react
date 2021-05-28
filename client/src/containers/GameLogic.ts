import spade from '../images/spade.png';
import diamond from '../images/diamond.png';
import clover from '../images/clover.png';
import heart from '../images/heart.png';

export default class GameLogic {

    public getDeck = () => {
        const deck = [];
        const suits = [spade, diamond, clover, heart];
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        for (const i of suits) {
            for (const x of values) {
                const card = {Value: x, Suit: i};
                deck.push(card);
            }
        }
        for (let i=0; i<1000; i++) {
            const location1 = Math.floor((Math.random() * deck.length));
            const location2 = Math.floor((Math.random() * deck.length));
            const tmp:any = deck[location1];

            deck[location1] = deck[location2];
            deck[location2] = tmp;
        }
        return {
            deck
        }
    }

    public getPlayerTotal = (p1: any) => {
        let total = 0;
        p1.map((card: any) => {
            if (card.Value === "A") {
                total += 11;
                if (total > 21) {
                    total -= 10;
                }
            } else if (card.Value === "J") {
                total += 10;
            } else if (card.Value === "Q") {
                total += 10;
            } else if (card.Value === "K") {
                total += 10;
            } else {
                total += parseInt(card.Value, 10)
            }
        })

        if(total>21){
            const res = this.ifAce(p1, total)
            total = res
        }
        return {
            playerTotal: total
        }
    }

    public getDealerTotal = (p2: any, showDealer: number) => {
        let total = 0;
        if(showDealer === 0){
            p2 = p2.slice(0,1)
        }
        p2.map((card:any) => {
            if (card.Value === "A") {
                total += 11;
                if (total > 21) {
                    total -= 10;
                }
            } else if (card.Value === "J") {
                total += 10;
            } else if (card.Value === "Q") {
                total += 10;
            } else if (card.Value === "K") {
                total += 10;
            } else {
                total += parseInt(card.Value, 10);
            }
        })
        if(total>21){
            const res = this.ifAce(p2, total)
            total = res
        }
        return {
            dealerTotal: total
        }
    }

    public whoWon = (playerTotal: number, dealerTotal: number, p1Length: number) => { 
        let won = 0;

        if(playerTotal > 21){  won = 2 }
        if(playerTotal === 21){ won = (p1Length === 2) ? 4 : 1 }
        if(playerTotal < 21){
            // no need to check show dealer condition because dealer can never get 21 before he shows his second card
            if(dealerTotal >= 17 && dealerTotal <= 21){
                won = (dealerTotal > playerTotal) ? 2 : (dealerTotal < playerTotal) ? 1 : 3
            }
            if(dealerTotal > 21){
                won = 1
            }
        }

        return {
            won
        }
    }

    public hitPlayerCard = (p1: any, card: any, index: number) => {
        p1 = p1.concat(card)
        const total = this.getPlayerTotal(p1)
        return {
            p1,
            index: index + 1,
            playerTotal: total.playerTotal
        }
    }

    public hitDealerCard = (p2: any, card: any, index: number) => {
        p2 = p2.concat(card)
        // dealer hits when player chose to stay
        const total = this.getDealerTotal(p2, 1)
        return {
            p2,
            index: index + 1,
            dealerTotal: total.dealerTotal
        }
    }

    public showDealer = (p2: any)=>{
        const total = this.getDealerTotal(p2, 1)
        return {
            dealerTotal: total.dealerTotal,
            showDealer: 1
        }
    }

    public ifAce = (p1: any, tot: number) => {
        let total = tot
        p1.map((card: any) => {
            if (card.Value === "A") {
                total = tot - 10
            }
        })
        return total
    }


}