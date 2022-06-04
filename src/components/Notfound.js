import React from 'react';
import { Link } from 'react-router-dom';


class Notfound extends React.Component{
    render(){
        return <div>
      
            <p style={{textAlign:"center", color:"red"}}>
              <b style={{fontSize: "x-large"}}>404</b>
              <br></br>
              <img src="https://i.gifer.com/YYlY.gif" width={"200px"}/>
              <br></br>
              My dude you have arrived at a page that doesn't exist.
              <br></br>
              <Link to="/">Return to the home page, loser</Link>
            </p>
          </div>;
    }
}
export default Notfound;