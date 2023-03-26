export default function Home() {
  return (
    <>
      <div style={{ backgroundColor: "black", height: "100vh", margin: "0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <h1 style={{color: "white", fontFamily: "system-ui", fontSize: "55px", fontWeight: "bold"}}>Speedpainter</h1>
          <textarea placeholder="Enter your prompt here..." style={{borderColor: "orange", borderWidth: "5px", borderRadius: "15px", height: "10em", width: "50em"}}></textarea>
          <button style={{backgroundColor: "rgba(255,255,255,0.3", borderWidth: "0", color: "white", width: "10em", height: "5em", borderRadius: "1em"}}>Go</button>
          <p style={{color: "white", fontFamily: "system-ui", fontSize: "55px", fontWeight: "bold"}}>Styles</p>
        </div>
      </div>
    </>
  );
}
