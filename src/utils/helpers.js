
import _ from 'lodash'







 
const logout = () =>{
        
    if(!_.isEmpty(window.localStorage.getItem('token'))){
       window.localStorage.clear()
       window.location.replace('/login')
       window.location.reload()
    }
    
 }




 export  { logout}