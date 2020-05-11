import React, {useState, useEffect} from "react"
import { Progress } from 'react-sweet-progress'
import "react-sweet-progress/lib/style.css"





const Widget = () => {

            const [totalGoal, setTotalGoal] = useState(0);
            const [reached, setReached] = useState(0);
            const [apiKey, setApiKey] = useState(process.env.REACT_APP_JG_ID);
            const [eventID, setEventID] = useState(process.env.REACT_APP_FUND_PAGE);
            const [dataObject, setDataObject] = useState('');
            const [targetAmount, setTargetAmount] = useState(0);
            const [currency, setCurrency] = useState('');
            const [raisedAmount, setRaisedAmount] = useState(0);
            const [percentageRaised, setPercentageRaised] = useState(0);
            const [strokeColor, setStrokeColor] = useState('blue');
            const [trailColor, setTrailColor] = useState('white');


        
          
            
   
    useEffect( () =>{
        getData()
       const intervalId = setInterval(() => getData(), 30000);
       return () => clearInterval(intervalId);
    }, []);
   

     const getData = () =>{
        const url =  "https://api.justgiving.com/" + apiKey + "/v1/fundraising/pages/" + eventID
        console.log(url, 'this should be the url')
        
            
    
        fetch(url,{
        headers:{"Content-Type": "application/json"
             }
        })
        .then(response => response.json())
        .then (data =>{
            

                setDataObject(data);
                setTargetAmount(data.fundraisingTarget);
                setCurrency(data.currencySymbol);
                setRaisedAmount(data.totalRaisedOnline); 
                setPercentageRaised(data.totalRaisedPercentageOfFundraisingTarget); 
                
           
        })
    }

    

        return (
         <div className="green-screen">
            <div className="everything">
                    <div className="progressBar">
                    
                    
                        
                            <div className="labels">
                                    <label>{currency}{raisedAmount}</label>  
                                </div>
                            {(percentageRaised > 100)  ? <Progress percent="100" 
                                        theme={
                                            {
                                            
                                            active: {
                                                
                                                trailColor: trailColor,
                                                color: strokeColor
                                            }
                                            ,
                                                success: {
                                                    
                                                    trailColor: trailColor,
                                                    color: strokeColor
                                                  },
                                            }
                                        }
                            
                            
                            
                            
                            /> : <Progress percent={percentageRaised} 
                            
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
                                    <label>{currency}{targetAmount}</label>  
                                </div>
                            
                    </div>
                    <div>

                        <label className="labels">{percentageRaised}% RAISED SO FAR</label>
                    </div>

                

                </div>
            </div>   
        )
   

}

export default Widget