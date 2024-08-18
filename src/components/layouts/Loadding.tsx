import ReactLoading from "react-loading"

export const Loadding: React.FC = ()=>{
    return <div className="animate__animated animate__fadeIn" style={{
                position: "absolute",
                top: 0, left: 0,
                width: "100vw",
                height: "100vh",
                paddingTop: "15%",
                background: "black"
            }}>

        <div>
            <ReactLoading className="mx-auto" type={"spokes"} color={"#fff"} height={"10%"} width={"10%"} />
            <h1 style={{color:"white",textAlign:"center", marginTop: "2rem"}}>Loadding...</h1>
        </div>
    </div>
}