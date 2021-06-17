import React,{Component} from 'react';
import { withRouter } from 'react-router';

import './Search.css';

const url = "https://internodeapi.herokuapp.com/city";
const rurl ="https://internodeapi.herokuapp.com/rest?city=";

class Search extends Component{

    constructor(props){
        super(props)

        this.state={
            city:'',
            rest:''
        }
    }

    //Display City in option
    renderCity = (data) => {
     
        if(data){
            return data.map((item)=>{
                return(
                    <option value={item.city}>{item.name} | {item.city_name}</option>
                )
            })
        }
    }

    renderRest = (data) => {
        if(data){
            return data.map((item) => {
                return(
                    <option value={item._id}>{item.name} | {item.locality}</option>
                )
            })
        }
    }

    handleCity=(event)=>{
        console.log(event.target.value)
        const cityId = event.target.value;
        fetch(`${rurl}${cityId}`,{method:'GET'})
        .then((res)=> res.json())
        .then((data) => {
            this.setState({rest:data})
        })
    }

   // handleRest=(event)=>{
   //     this.props.history.push(`/details/${event.target.value}`)
    //}
    
    

    render(){
        return(
            <React.Fragment>
                <div class="imageContainer">
                    <div style={{textAlign:'right'}}>
                        
                        <a className="fb myfont" href="https://www.facebook.com/" target="_blank">
                            <img src="facebook.png" className="social_logo"/>
                        </a>
                        <a class="yt myfont" href="https://www.youtube.com/developerfunnel" target="_blank">
                            <img src="youtube.png" className="social_logo"/>
                        </a>
                    </div>
                    <div id="logo">
                        <b>e!</b>
                    </div>
                    <div id="heading">
                        Find Bést Restaurants, Cafés, bars
                    </div>
                    <div className="locationSelector">
                        <select class="dropdown" onChange={this.handleCity}>
                            <option>----SELECT CITY----</option>
                            {this.renderCity(this.state.city)}
                            
                            
                        </select> 
                        <select className="dropdown" onChange={this.handleRest}>
                            <option>---- RESTAURANT----</option>
                            {this.renderRest(this.state.rest)}
                            
                        </select>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    //call api to get data
    componentDidMount(){
        
                fetch(url,{method:'GET'})
                .then((res) => res.json())
                .then((data)=> this.setState({city:data}))
            
        }

        
    }


export default withRouter(Search);