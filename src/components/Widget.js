import React from "react"
import { Progress } from 'react-sweet-progress'
import "react-sweet-progress/lib/style.css"





class Widget extends React.Component {

    constructor(){

        super()
        this.state = {

            totalGoal: 0,
            reached: 0,
            apiKey: process.env.REACT_APP_JG_ID,
            eventID: process.env.REACT_APP_FUND_PAGE,
            dataObject: '',
            targetAmount: '',
            currency: '',
            raisedAmount:'',
            percentageRaised: '',
            strokeColor: 'blue',
            test: '20',
            
        }
        this.getData = this.getData.bind(this)
    }
    componentDidMount(){
        this.getData()
       this.intervalId = setInterval(() => this.getData(), 30000);
    }
    componentWillUnmount(){

        clearInterval(this.intervalId)
    }

     getData(){
        const url =  "https://api.justgiving.com/" + this.state.apiKey + "/v1/fundraising/pages/" + this.state.eventID
        console.log(url, 'this should be the url')
        
            
    
        fetch(url,{
        headers:{"Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then (data =>{
            this.setState({

                dataObject: data,
                targetAmount: data.fundraisingTarget,
                currency: data.currencySymbol,
                raisedAmount: data.totalRaisedOnline,
                percentageRaised: data.totalRaisedPercentageOfFundraisingTarget,
                
            })
        })
    }

    render(){

        return (
         <div className="green-screen">
            <div className="everything">
                    <div className="progressBar">
                    
                    
                        
                            <div className="labels">
                                    <label>{this.state.currency}{this.state.raisedAmount}</label>  
                                </div>
                            {(this.state.percentageRaised > 100)  ? <Progress percent="100" 
                                        theme={
                                            {
                                            
                                            active: {
                                                
                                                trailColor: this.state.trailColor,
                                                color: this.state.strokeColor
                                            }
                                            ,
                                                success: {
                                                    
                                                    trailColor: this.state.trailColor,
                                                    color: this.state.strokeColor
                                                  },
                                            }
                                        }
                            
                            
                            
                            
                            /> : <Progress percent={this.state.percentageRaised} 
                            
                            theme={
                                {
                                
                                active: {
                                    
                                    trailColor: '#efefef',
                                    color: 'grey'
                                }
                                ,
                                    success: {
                                        
                                        trailColor: '#efefef',
                                        color: 'grey'
                                      },
                                }
                            }
                                    
                                    
                                    />} 
                                <div className="labels">
                                    <label>{this.state.currency}{this.state.targetAmount}</label>  
                                </div>
                            
                    </div>
                    <div>

                        <label className="labels">{this.state.percentageRaised}% RAISED SO FAR</label>
                    </div>

                

                </div>
            </div>   
        )
    }

}

export default Widget