import Loading from "react-loading"
import ReactLoading from "react-loading"

export const Loadding: React.FC = ()=>{
    return <div style={{
                position: "absolute",
                top: 0, left: 0,
                width: "100vw",
                height: "100vh",
                paddingTop: "15%",
                background: "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(0,212,255,1) 100%)"
            }}>

        <div>
            <ReactLoading className="mx-auto" type={"spin"} color={"#fff"} height={"10%"} width={"10%"} />
            <h1 style={{color:"white",textAlign:"center", marginTop: "2rem"}}>Loadding...</h1>
        </div>
    </div>
}