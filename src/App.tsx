
import { DashPlayer } from '../'
import './App.css'

function App() {
  return (
    <>
      <main>
        <h1>Hello there...</h1>
        {/* <VideoPlayer /> */}
        <div style={{ width: "500px" }}>
          <DashPlayer mpdUrl='http://localhost:9000/idan/89e31e46-f77a-48f2-bf35-0b81d969211b/pexels-eberhard-grossgasteiger-10079385.mpd' />
        </div>

      </main>
    </>
  )
}

export default App
