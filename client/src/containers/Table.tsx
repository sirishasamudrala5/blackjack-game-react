import * as React from 'react';
import '../css/Common.css'

interface ITable{
    tables : []
}
class Table extends React.Component{
    public state:ITable = {
        tables: []
    }

    public componentDidMount(){
        fetch('http://localhost:3001/api/tables', {mode: 'cors'})
        .then(results =>{
            return results.json()
        }).then(data =>{
            this.setState({
                tables : data
            })
        })
        
    }


    public render(){
        console.log(this.state.tables)

       return (
        <div className="panel panel-primary">

            <div className="panel-heading"><h4>BLACK JACK<span className="badge-header"><h5>&para;{": $ 45"}</h5></span></h4></div>

            <div className="panel-body">
                {this.state.tables.map((item: any, index: any) => (
                    
                    <div className="well well-sm" key={index}>
                        <div className="row">
                            <div className="col-md-2 col-xs-3 col-sm3"><span className="badge"><h5>{"$ " + item.betSize}</h5></span></div>
                            <div className="col-md-8 col-xs-6 col-sm-6"><h5 className="list-group-item-heading">{item.name}</h5>
                                <p className="list-group-item-text">{index+":Playing "+ index + ": Watching"}</p></div>
                            <div className="col-md-2 col-xs-2 col-sm-2"><a href={"game?as="+ (index === 0 ? 'join&tbl=' : 'view&tbl=') +item.name}><button className="btn btn-primary">{ index === 0 ? 'JOIN' : 'VIEW'}</button></a></div>
                        </div>
                    </div>
                    
                ))}
            </div>
            {/* TODO : make the footer fixed */}
            <div className="panel-footer"><h4>&nbsp;</h4></div>
        </div>


       )
   }

}

export default Table;