
// import { DashPlayer } from '../'
import { useState } from 'react'
import { DashPlayer } from "../lib/main"

const videoList = [
  {
    id: '1',
    src: 'http://127.0.0.1:9000/easy/172a6ded-f5fd-43d2-aefc-c343cf13b965/conversation-180.mpd',
    title: "Coffee video",
  }, {
    id: '2',
    src: 'http://127.0.0.1:9000/idan/4a05061c-51e5-4c1d-94ef-9ce422d95d12/Pexels%20Videos%201397052.mpd',
    title: "Caterpillar video",
  }, {
    id: '3',
    src: 'http://127.0.0.1:9000/idan/89e31e46-f77a-48f2-bf35-0b81d969211b/pexels-eberhard-grossgasteiger-10079385.mpd',
    title: "Landscape video",
  }
]

function App() {

  const [selected, setSelected] = useState(videoList[0]);
  const [width, setWidth] = useState("300px");

  const items = videoList.map(video => {
    return (
      <li style={{
        padding: "10px",
        backgroundColor: selected === video ? "black" : "#5bb7ff",
        color: "#fff",
        marginBottom: "10px",
        borderRadius: "5px"
      }} key={video.id}>
        <button onClick={() => { setSelected(video) }}>{video.title}</button>
      </li>
    )
  })

  return (
    <>
      <main className=' flex flex-col w-full justify-center items-center'>
        <h1 className=' text-3xl'>Hello there...</h1>
        {/* <VideoPlayer /> */}
        <div style={{ maxWidth: width, marginBottom: "10px", width: "100%" }}>
          <DashPlayer mpdUrl={selected.src} />
        </div>

        <div className=' flex'>
          <ul style={{ marginTop: "20px" }}>
            {
              items
            }
          </ul>
          <div className=' flex flex-col mt-5 ml-4'>
            <button
              onClick={() => setWidth("500px")}
              className=' mb-[10px] rounded-md p-[10px] bg-slate-400'>550px</button>
            <button
              onClick={() => setWidth("600px")}
              className=' mb-[10px] rounded-md p-[10px] bg-slate-400'>600px</button>
            <button
              onClick={() => setWidth("100%")}
              className=' mb-[10px] rounded-md p-[10px] bg-slate-400'>900px</button>
          </div>

        </div>


      </main>
    </>
  )
}

export default App
