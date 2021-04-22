export class Resources {
  getUserDataF() {
    return fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((e) => console.log("Error solcitando datos",e));
  }

  getUSerDataAA = async() =>{
    try{
           const res  = await fetch('https://jsonplaceholder.typicode.com/users');
           if(res.status==200){
            const data = await res.json();
            return data;
           }else{             
             throw 'Error en la conexión';
           }
    } catch(e){    
      console.log('ERROR: ', e);
    }
  }
}
