import React, {useState} from 'react';
const StaffContext = React.createContext();

const StaffContextProvider = (props) => {
    const [adding, setAdding] = useState(false);
    return <StaffContext.Provider value={{setAdding, adding}}>{props.children}</StaffContext.Provider>
}

export {StaffContextProvider, StaffContext}