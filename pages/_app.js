import "../styles/globals.css";

function MyApp({Component, pageProps}){
    return (
        <div className="h-screen bg-gradient-to-b from-cyan-500 to-white">
            <Component {...pageProps} />
        </div>
    )
}

export default MyApp