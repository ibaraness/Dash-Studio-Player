
import { DashPlayer } from '../'
import { useState } from 'react'
// import { DashPlayer } from "../dist/components/DashPlayer"

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

  const items = videoList.map(video => {
    return (
      <li style={{
        padding: "10px", 
        backgroundColor: selected === video ? "black" : "#5bb7ff",
        color:"#fff",
        marginBottom:"10px",
        borderRadius:"5px"
        }} key={video.id}>
        <button onClick={()=>{setSelected(video)}}>{video.title}</button>
      </li>
    )
  })

  return (
    <>
      <main className=' flex flex-col w-full justify-center items-center'>
        <h1 className=' text-3xl'>Hello there...</h1>
        {/* <VideoPlayer /> */}
        <div className=' w-full sm:max-w-[600px]'>
          <DashPlayer mpdUrl={selected.src} />
        </div>
        <ul style={{marginTop:"20px"}}>
          {
            items
          }
        </ul>
      </main>
    </>
  )
}

export default App
