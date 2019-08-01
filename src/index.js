import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';



class Game extends React.Component
{

constructor()
{
super();

this.state=
{
history:[{square:Array(9).fill(null)}],
flag:true,
step:0,
toggle:true,
loc:Array(2).fill(null),
}

}
handleClick(i)
{
const history=this.state.history.slice(0,this.state.step+1);
const current=history[history.length-1];
const sq=current.square.slice();
let a=winner(sq);
const matri=[[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]
if(sq[i] || a)
return ;
sq[i]=this.state.flag?'X':'0';
  this.setState({
      history: history.concat([
        {
          square: sq
        }
      ]),
      flag: !this.state.flag,
      step: history.length,
     loc:matri[i],
    });
    
}
toggle()
{
   this.setState({toggle:!this.state.toggle});
}
jumpto(step)
{
          for(let c=0;c<9;c++)
          if(document.getElementById(c).classList.contains('highlight'))
          {
              document.getElementById(c).classList.remove('highlight')
          }
      this.setState({step:step});
}

render()
{

const matri=[[0,0][0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]
    let current=this.state.history[this.state.step].square.slice();
    console.log(this.state.history);
    let a;

let b=winner(current);
let next=this.state.flag?'X':'0';
//enhance no 6
        a=b?'winner is '+current[b[0]]:this.state.step==9?'match draw':'next player'+next;
//enhance no 5
        if(b)
        {for(let i of b) document.getElementById(i).classList.add('highlight');}
    const displaybutton=[[null,null,null]];
    let ii=0;
    let ele=[];
    let j=0;
    //enhance no 3
for(let x=0;x<current.length;x=x+3)
{ 
j=0
for(let y=x;y<x+3;y++)
ele[j++]=<button id={y} onClick={()=>this.handleClick(y)}><p>{current[y]}</p></button>

displaybutton[ii++]=<div>{ele}</div>

ele=[];
}


let z;
    //   const displaybutton=current.map((item,index)=>{
    //   z=<<button id={index} onClick={()=>this.handleClick(index)}>{item}</button>
    // return  (<button id={index} onClick={()=>this.handleClick(index)}>{item}</button>)

    // });
let i=0;
let l=this.state.history.length;
const moves=this.state.history.map((item,index)=>{

if(this.state.toggle){
    const detail=index?'move to'+index:'start of game';
    if(this.state.step==index)//enhance no 2
    {  
    return (<tr><td>{index}</td><td><button  className='dis' onClick={()=>this.jumpto(index)}>{detail}</button></td></tr>)}
       return (<tr><td>{index}</td><td><button className='dis2' onClick={()=>this.jumpto(index)}>{detail}</button></td></tr>)
}
else{
    i=i+1;
    let z=l-i;
      const detail=z?'move to'+z:'start of game';
      if(this.state.step==z){
    return (<tr><td>{z}</td><td><button className='dis' onClick={()=>this.jumpto(z)}>{detail}</button></td></tr>)}//enhace no 1
    return (<tr><td>{z}</td><td><button className='dis2' onClick={()=>this.jumpto(z)}>{detail}</button></td></tr>)
}
});
// enhance no 4
    let tog=<button id='dis' onClick={()=>this.toggle()}>toggle</button>
return (<div className='container'>

{displaybutton}
<div>{a}</div>
<br></br>
<div><table border='50' ><tbody><tr><th>No</th><th>location</th></tr>{moves}</tbody></table></div>
<br></br>
<table><tbody><tr><th>col</th><th>row</th></tr><tr><td>{this.state.loc[0]}</td><td>{this.state.loc[1]}</td></tr></tbody></table><br></br>
{tog}
</div>
)

}
}

ReactDOM.render(<Game/>, document.getElementById('root'));


function winner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a,b,c];
    }
  }
  return null;
}
serviceWorker.unregister();