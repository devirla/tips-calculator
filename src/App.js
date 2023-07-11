import logo from './images/logo.svg';
import './App.css';
import './SingleInput.css';
import './SingleResult.css';
import SingleInput from './SingleInput';
import SingleResult from './SingleResult';
import { useEffect, useRef, useState } from 'react';

function App() {

  const [bill, setBill] = useState(0);
  const [numberPeople, setNumberPeople] = useState(0);
  const [tip, setTip] = useState(0);
  const [tipAmount, setTipAmount] = useState(0);
  const [total, setTotalResult] = useState(0);

  const [tipsButtons, setTipsButtons] = useState([
    {name: 'darkTheme tipButton activeTheme', placeholder:"", value: "5%", type: "button",  onClick: "handleTipChange", onChange: "", readOnly: "readonly"  },
    {name: 'darkTheme tipButton', placeholder:"", value: "10%", type: "button", onClick: "handleTipChange", onChange: "", readOnly: "readonly"  },
    {name: 'darkTheme tipButton', placeholder:"", value: "15%", type: "button", onClick: "handleTipChange", onChange: "", readOnly: "readonly"   },
    {name: 'darkTheme tipButton', placeholder:"", value: "25%", type: "button", onClick: "handleTipChange", onChange: "", readOnly: "readonly"   },
    {name: 'darkTheme tipButton', placeholder:"",  value: "50%", type: "button", onClick: "handleTipChange", onChange: "", readOnly: "readonly"  },
    {name: 'tipButton customTipButton', placeholder: "Custom", value: "", type: "text", onClick: "", onChange: "handleCustomTipChange", readOnly: "false" },
    ]);


/* function is setting value of bill and checking corectness of the entered data*/
  const handleBillChange = ( e ) => {
    let bill= 0;
    e.target.style.border = "none";
    e.target.parentNode.firstChild.lastChild.style.visibility = "hidden";
    bill = e.target.value.replace(/,/g, '.');
    setBill( bill);

    if (bill > 0){
      document.querySelector(".calculator__bill").style.color = getComputedStyle(document.documentElement).getPropertyValue('--very-dark-cyan');
      
    }
    else{
      e.target.parentNode.firstChild.lastChild.style.visibility = "visible";
      e.target.style.border = "red 2px solid";
    }

   
  }

  /* function is setting value of number of people and checking corectness of the entered data*/
  const handleNumberChange = ( e ) => {
    e.target.style.border = "none";
    e.target.parentNode.firstChild.lastChild.style.visibility = "hidden";
    setNumberPeople( e.target.value);
    
    if (e.target.value > 0){
      document.querySelector(".calculator__people").style.color = getComputedStyle(document.documentElement).getPropertyValue('--very-dark-cyan');
      
    }
    else{
      e.target.parentNode.firstChild.lastChild.style.visibility = "visible";
      e.target.style.border = "red 2px solid";
    }
    
  }

  /* mapping array of objects and setting active tip button */
  const handleTipChange = ( e, indexMe ) => {
    tipsButtons.map( (tipButton, index) => {
      if ( tipButton.name.includes("activeTheme") == true){
        let temporaryItem = tipButton.name;
        temporaryItem = temporaryItem.replace("activeTheme", "");
        tipButton.name = temporaryItem.trim();   
      }

      if(indexMe == index){
        if( index == tipsButtons.length - 1){
          let temporaryItem = tipButton.name;
          temporaryItem += " activeThemeCustom";
          tipButton.name = temporaryItem.trim();   
          console.log(tipButton.name);
        }
        else{
          let temporaryItem = tipButton.name;
          temporaryItem += " activeTheme";
          tipButton.name = temporaryItem.trim();   
          console.log(tipButton.name);
        }

      }

  });

    setTip(e.target.value);
  }

   /* mapping array of tips and setting value of custom tip button */
  const handleCustomTipChange = ( e, index ) => {
    console.log(tipsButtons[index].value);
    const newTipsButtons = [...tipsButtons];

    newTipsButtons[index].value = e.target.value;
    setTipsButtons(newTipsButtons);
    setTip(e.target.value);
  }

    /* calculating Tip amount value */
  const handleTipAmount = ( ) => {
    let value=0;
    if( tip!==0 & numberPeople!==0 ){
      value = (bill*parseFloat(tip)/100)/numberPeople;
    }
    
  setTipAmount(Number(value).toFixed(2));
  }

  /* calculating total result value (sum of tip and bill value per person) */
  const handleTotalResult = () => {
    let totalResult =0;
    if( bill!==0 & numberPeople !== 0 ){
       totalResult = Number(bill/numberPeople)+Number(tipAmount);
    }
    setTotalResult(totalResult.toFixed(2));
  }

  /* restarting values to baseline */
  const handleRestart = () => {
    const newTipsButtons = [...tipsButtons];
    newTipsButtons.map( button => {
      if ( button.name.includes("activeTheme")){
        button.name= 'darkTheme tipButton';
      };
    });
  
    newTipsButtons[0].name = 'darkTheme tipButton activeTheme';
    newTipsButtons[newTipsButtons.length - 1].value = "";
    newTipsButtons[newTipsButtons.length - 1].name = 'tipButton customTipButton';

    setTipsButtons(newTipsButtons);
    setBill(0);
    setNumberPeople(0);
    setTip(0);
    setTipAmount(0);
    setTotalResult(0);
  }

  useEffect( () => {
    handleTipAmount();
    handleTotalResult();
  });

  

   return (
    
      <div className='App'>
      { console.log("Start")}
      { console.log({tipAmount})}
      { console.log({total})}
        <img className='App__logo' src={logo}></img>
        <div className='calculator'>
         {/* bill input*/}
            <div className='calculator__input'>
              < SingleInput
                className="calculator__inputBox"
                labelClassName= "calculator_label"
                inputClassName="calculator__input calculator__bill"
                value= {bill}
                name="bill"
                text="Bill"
                onChange={handleBillChange}
               />
               {/* tips section*/}
              <div className='calculator__item '>
                <label className='calculator__input'>Select Tip %</label>
                <div className='calculator__tipButtons'>
                  {tipsButtons.map( (tipButton, index)=> (
                    <input 
                    key={index}
                    type={tipButton.type} 
                    className={tipButton.name}
                    placeholder={tipButton.placeholder} 
                    value={tipButton.value} 
                    onClick={( event )=> handleTipChange(event, index)}
                    onChange={(e)=>handleCustomTipChange(e, index)}
                    />
                  ))
                  }
                  </div>
                
              </div>
              {/* number of people input*/}
              < SingleInput
                className="calculator__item"
                labelClassName= "calculator_label"
                inputClassName="calculator__input calculator__people"
                value={numberPeople}
                name="numberPeople"
                text="Number of People" 
                onChange = {handleNumberChange}
              />
            </div>
            {/* result section*/}
            <div className='darkTheme calculator__result'>
              <div className='calculator__resultSummary'>
              < SingleResult
                text="Tip Amount " 
                result={tipAmount}
                />
                < SingleResult 
                text="Total " 
                result={total}
                />
              </div>
              {/* restart button*/}
              <button className={`resultButton ${ total==0 ? `cyanTheme`:`activeTheme`}`} onClick={handleRestart} >Reset</button>
            </div>
        </div>
      </div>
  );
}

export default App;
