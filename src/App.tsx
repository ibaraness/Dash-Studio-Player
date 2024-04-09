
// import { DashPlayer } from '../'
import { useState } from 'react'
import { DashPlayer } from "../lib/main"
import { DashPlayerCaption, DashVideoItem } from '../lib/components/DashPlayer';


const enSubtitle = new DashPlayerCaption();
enSubtitle.language = 'en';
enSubtitle.src = 'http://127.0.0.1:9000/idan/df2f5a0f-f179-4051-9ed7-fbe7cec4ddcc/tunnel_vision.srt';

const videoList: DashVideoItem[] = [
  {
    id: '1',
    src: 'http://127.0.0.1:9000/easy/172a6ded-f5fd-43d2-aefc-c343cf13b965/conversation-180.mpd',
    captions:[],
    title: "Coffee video",
  }, {
    id: '2',
    src: 'http://127.0.0.1:9000/idan/4a05061c-51e5-4c1d-94ef-9ce422d95d12/Pexels%20Videos%201397052.mpd',
    captions:[],
    title: "Caterpillar video",
  }, {
    id: '3',
    src: 'http://127.0.0.1:9000/idan/89e31e46-f77a-48f2-bf35-0b81d969211b/pexels-eberhard-grossgasteiger-10079385.mpd',
    captions:[],
    title: "Landscape video",
  },
  {
    id: '4',
    src: 'http://127.0.0.1:9000/idan/df2f5a0f-f179-4051-9ed7-fbe7cec4ddcc/tunnel_vision.mpd',
    captions:[
      enSubtitle
    ],
    title:'Tunnel vision'
  }
]

function App() {

  const [selected, setSelected] = useState(videoList[0]);
  const [width, setWidth] = useState("500px");

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
          <DashPlayer videoItem={selected} displayCaptions={false} />
        </div>

        <div className=' flex'>
          <ul style={{ marginTop: "20px" }}>
            {
              items
            }
          </ul>
          <div className=' flex flex-col mt-5 ml-4'>
            <button
              onClick={() => setWidth("400px")}
              className=' mb-[10px] rounded-md p-[10px] bg-slate-400'>400px</button>
            <button
              onClick={() => setWidth("600px")}
              className=' mb-[10px] rounded-md p-[10px] bg-slate-400'>600px</button>
            <button
              onClick={() => setWidth("100%")}
              className=' mb-[10px] rounded-md p-[10px] bg-slate-400'>900px</button>
          </div>

        </div>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc felis nulla, vestibulum sed pretium vel, condimentum ac turpis. Fusce pharetra accumsan consequat. Morbi eleifend scelerisque turpis, at viverra justo vehicula id. Etiam id feugiat nulla. Aliquam posuere non eros et suscipit. Donec ut lacus in arcu imperdiet efficitur vitae ac urna. Curabitur dapibus elementum leo ut euismod. Nunc et mauris hendrerit, fermentum mi a, consequat diam. Aliquam erat volutpat. Nullam tristique magna a est placerat pretium. Ut quis pulvinar dolor, et imperdiet neque. Pellentesque rutrum pellentesque tellus non rutrum. Ut non nibh nec tellus dapibus lacinia ac a nibh. Nam odio nulla, gravida eget gravida sed, varius in sapien. Duis nunc nisl, eleifend id dui a, consectetur dignissim enim. In mollis efficitur lorem at hendrerit.

          Duis pulvinar velit sit amet turpis vulputate pretium. Maecenas ut sem massa. Vestibulum non justo mauris. Praesent sit amet fermentum lorem. Proin pretium aliquam rutrum. Curabitur a venenatis ipsum. Mauris at purus urna. Maecenas in cursus justo.
        </p>

      </main>
    </>
  )
}

export default App
