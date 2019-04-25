import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
    if(isSignedIn) {
        return (
            <div style={{display:'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signout')} className="f3 link dim black underline pa3 pointer">Signout</p>
            </div>
        )   
    }else{
        return (
            <div style={{display:'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signin')} className="f3 link dim black underline pa3 pointer">Signin</p>
                <p onClick={() => onRouteChange('register')} className="f3 link dim black underline pa3 pointer">Register</p>
            </div>
        )
    }
}
export default Navigation;