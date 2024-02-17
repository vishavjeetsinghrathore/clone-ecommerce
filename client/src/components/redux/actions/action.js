const BASE_URL = process.env.REACT_APP_BASE_URL;
export const getProducts=()=>async(dispatch)=>{
    try{
        const data=await fetch(`${BASE_URL}/getproducts`,{
            method:"GET",
            headers:{
                "Content-Type":"aplication/json"
            }
        });

        const res=await data.json();
        console.log(res);
        dispatch({type:'SUCCESS_GET_PRODUCTS',payload:res})

    }
    catch(error){

        dispatch({type:"FAIL_GET_PRODUCTS",payload:error.response})

    }
}