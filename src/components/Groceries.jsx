import {useEffect, useState} from "react"
import axios from "axios"


export const Groceries = () =>{
    const [text,setText] = useState("")
    const [groceries,setgroceries] = useState([])
    const [page,setpage] = useState(1)



    useEffect(() =>{
        getdata()
    },[page]) 

    const getdata = () => {
        axios.get(`http://localhost:3001/groceries?_limit=3&_page=${page}`).then(res => {
        setgroceries(res.data)
        })
    }    

    return( <div>
        <input type="text" onChange={(e)=>setText(e.target.value)} />

        <button onClick={()=>{
            localStorage.setItem("groc",JSON.stringify(text))
            fetch("http://localhost:3001/groceries",{
                method:"POST",
                body: JSON.stringify({title:text,purchased:false}),
                headers:{
                 "Content-Type":"application/json",
                },
            }).then(() => {
                getdata()
            })
        }}>
        Save Item
        </button>

        { groceries.map((g) => (
            <div key={g.id}>{g.title} </div>
        ))}

        <button onClick={() => {
            setpage(page-1)
        }}>PREV</button>

        <button onClick={() => {
            setpage(page+1)
        }}>NEXT</button>

        </div>
    )
}