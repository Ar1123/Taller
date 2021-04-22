export class Resources {
  getUSerDataAA = async() =>{
    try{
           const res  = await fetch('https://jsonplaceholder.typicode.com/users');
           if(res.status==200){
             let resul;
            const data = await res.json();      
            data.forEach(element => {
              resul = element.name;                
            }); 
            
            return data;
           }else{             
             throw 'Error en la conexión';
           }
    } catch(e){    
      console.log('ERROR: ', e);
    }
  }
  
  getDatosLocal  =async()=>{
    try {
        const res  = await fetch('./db/json_local.json');
        const data = await res.json();
        return data;
    }catch(e){
        console.log('ERROR',e);
    }
  }

}
