import React, { useContext, createContext } from 'react'
const RequiredDataContext=createContext()
const states = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", 
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", 
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", 
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", 
  "Wisconsin", "Wyoming"
];
const RateStructure=["Fixed", "Adjustable"]
const LoanTerm=["30 Years","15 Years"]
const LoanType=["Conventional","FHA", "VA" ]
export const useRequiredDataContext = () => useContext(RequiredDataContext);
const RequiredDataProvider = ({children}) => {
  
  return (
   <RequiredDataContext.Provider value={{states,RateStructure,LoanTerm,LoanType}}>{children}</RequiredDataContext.Provider>
  )
}

export default RequiredDataProvider