import * as React from 'react';
import '../css/Common.css';
import {Link} from 'react-router-dom';

import GameLogic from './GameLogic';

const gl = new GameLogic();
interface IGame{
    deck: string;
    p1: any [];
    p2: any [];
    won: number;
    showDealer: number;
    playerTotal: number;
    dealerTotal: number;
    playerIndex: number;
    dealerIndex: number;
}

class Game extends React.Component{
    public state:IGame = {
        deck: '',
        p1: [],
        p2: [],
        won: 0,
        showDealer: 0,
        playerTotal: 0,
        dealerTotal: 0,
        playerIndex: 3,
        dealerIndex: 3 
    }

    public componentDidMount(){
        this.reset()
    }

    public componentWillUpdate(){
        if(this.state.showDealer === 1){
            this.checkDealer()
        }
    }


    public reset = ()=>{
        // step1: get the deck
        const getdeck = gl.getDeck()

        this.setState({
            deck: getdeck.deck,
            p1: [getdeck.deck[0], getdeck.deck[2]],
            p2: [getdeck.deck[1], getdeck.deck[3]]
        }, () =>{
            // step2: get player total
            const getPTotal = gl.getPlayerTotal(this.state.p1)
            this.setState({
                playerTotal: getPTotal && getPTotal.playerTotal ? getPTotal.playerTotal : 0
            },
            () =>{
                // step3: get dealer total
                const getDTotal = gl.getDealerTotal(this.state.p2, this.state.showDealer)
                this.setState({
                    dealerTotal: getDTotal && getDTotal.dealerTotal ? getDTotal.dealerTotal : 0
                },() =>{
                    // step4: get who won
                    const getWhoWon = gl.whoWon(this.state.playerTotal, this.state.dealerTotal, this.state.p1.length)
                    this.setState({
                        won: getWhoWon.won
                    })
                })
            })
        });
    }

    public handleHit = (event: any)=> {
        if(this.state.p1){
            const playerHit = gl.hitPlayerCard(this.state.p1, this.state.deck[this.state.playerIndex], this.state.playerIndex)
            this.setState({
                p1: playerHit.p1,
                playerIndex: playerHit.index,
                playerTotal: playerHit.playerTotal
            },() => {
                const getWhoWon = gl.whoWon(this.state.playerTotal, this.state.dealerTotal, this.state.p1.length)
                this.setState({
                    won: getWhoWon.won
                })
            })
        }
        event.preventDefault();
    }

    public hitDealer = () => {
        const dealerHit = gl.hitDealerCard(this.state.p2, this.state.deck[this.state.dealerIndex], this.state.dealerIndex)
        this.setState({
            p2: dealerHit.p2,
            dealerIndex: dealerHit.index,
            dealerTotal: dealerHit.dealerTotal
        }, () => {
            const getWhoWon = gl.whoWon(this.state.playerTotal, this.state.dealerTotal, this.state.p1.length)
            console.log("hit won", getWhoWon)
            console.log("hit p2", this.state.p2)
            this.setState({
                won: getWhoWon.won
            }, () => {
                console.log("hit won", getWhoWon)
            })
        })
    }

    public checkDealer = () => {
        console.log("checkdeler", this.state.won)
        if(this.state.dealerTotal && this.state.dealerTotal < 17){
            this.hitDealer()
        }
    }

    public handleStay = (event: any)=> {
        if(this.state.p2){
            const dealerPlay = gl.showDealer(this.state.p2)
            this.setState({
                showDealer: dealerPlay.showDealer,
                dealerTotal: dealerPlay.dealerTotal
            },() => {
                    this.hitDealer()
                    this.checkDealer()
            })
        }
        event.preventDefault();
    }

    public handleRestart = (event: any)=>{
        this.setState({
            deck: '',
            p1: [],
            p2: [],
            won: 0,
            showDealer: 0,
            playerTotal: 0,
            dealerTotal: 0,
            playerIndex: 3,
            dealerndex: 3
        },() => {
            this.reset()
        })

        event.preventDefault();
    }


    public createPlayerCards = () =>{
        const cards: any = []
        if(this.state.p1){
            const players = this.state.p1
            players.map((player, key) => {
                cards.push(<div className="card" key={key}>
                <p className="top">{player.Value}</p>
                <img className="card-img-top" src={player.Suit}></img>
                <p className="bot">{player.Value}</p>
            </div>)
               
            })
        }
        return cards
    }

    public createDealerCards = () =>{
        const cards: any = []
        if(this.state.p2){
            let dealers = this.state.p2
            if(!this.state.showDealer){
                dealers = dealers.slice(0,1)
            }
            console.log(dealers)
            dealers.map((dealer, key) => {
                cards.push(<div className="card" key={key}>
                <p className="top">{dealer.Value}</p>
                <img className="card-img-top" src={dealer.Suit}></img>
                <p className="bot">{dealer.Value}</p>
            </div>)
               
            })
        }
        return cards
    }

    public render() {
        let winner = '';
        if(this.state.won){
            switch(this.state.won){
                case 1 : winner = 'You won'; break;
                case 2 : winner = 'Burst'; break;
                case 3 : winner = 'Push'; break;
                case 4 : winner = 'Black Jack'; break;
                case 5 : winner = 'Burst'; break;
            }
        }
        const displayModal = this.state.won >0 ? {display: 'block'} : {display: 'None'}

       return (
        <div className="panel panel-primary">

            <div className="panel-heading"><h4>BLACK JACK<span className="badge-header"><h5>&para;{": $ 45"}</h5></span></h4></div>

            <div className="panel-body">
                <div className="modal modal" style={displayModal}>
                    <div className="modal-dialog">
                        <div className="modal-content">

                        <div className="modal-body">
                            <h3>{winner}</h3>
                        </div>
                        <div className="modal-footer">
                            <Link to="/"><button type="button" className="btn btn-default" data-dismiss="modal">Close</button></Link>
                            <button type="button" className="btn btn-primary" onClick={this.handleRestart}>Start Over</button>
                        </div>
                        </div>
                    </div>
                </div>
                <h3>Player: (Score - {this.state.playerTotal ? this.state.playerTotal : 0} )</h3>
                <div className="p1">
                    {this.createPlayerCards()}
                </div>
                <h3>Dealer: (Score - {this.state.dealerTotal ? this.state.dealerTotal : 0} )</h3>
                <div className="line">
                    {this.createDealerCards()}
                </div>
            </div>
            <div className="panel-footer">
                <button className="btn btn-warning" onClick={this.handleStay}>STAY</button>
                <button className="btn btn-warning btn-right" onClick={this.handleHit} disabled={this.state.showDealer ? true : false}>HIT</button>
            </div>
        </div>
       )
   }

}

export default Game;