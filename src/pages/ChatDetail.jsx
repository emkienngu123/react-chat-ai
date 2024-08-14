import React, { useEffect } from 'react'
import TempImg from '../assets/temp.jpeg'
import IconMenu from '../assets/menu.png'
import SideBar from '../components/SideBar'
import IconStar from '../assets/star.png'
import { useParams } from 'react-router-dom'
import Gemini from '../gemini'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage, setNameChat } from '../store/chatSlice'
import DOMPurify from 'dompurify';



const ChatDetail = () => {
  const dispatch = useDispatch()
  const { id } = useParams();

  const [menuToggle, setMenuToggle] = React.useState(false);
  const [dataDetail, setDataDetail] = React.useState([]);
  const [messageDetail,setmessageDetail] = React.useState([]);
  const [inputChat, setinputChat] = React.useState("")
  const { data } = useSelector((state) => state.chat)
  console.log('Data : ', data)


  useEffect(() => {
    if (data.length > 0) {
      console.log('use effect')
      const chat = data.find(chat => chat.id === id)
      console.log(chat)
      if (chat) {
        setDataDetail(chat)
        setmessageDetail(chat.messages)
      }
    }
  }, [data, id])


  const handleChatDetail = async () => {
    if (id) {
      const chatText = await Gemini(inputChat,messageDetail);
      if(dataDetail.title === 'Chat'){
        const promptName = `This is a new chat, and user ask about ${inputChat}. No reply and comment just give me a name for this chat. Max length is 10 characters.`;
        const newTitle = await Gemini(promptName);
        dispatch(setNameChat({newTitle,chatId: id}))
      }
      if (chatText) {
        const dataMess = {
          idChat: id,
          userMess: inputChat,
          botMess: chatText
        }
        dispatch(addMessage(dataMess))
        setinputChat("")
      }
    }
  }

  return (
    <div className='text-white xl:w-[80%] w-full relative '>
      <div className=' flex items-center space-x-2 p-4'>
        <button onClick={() => setMenuToggle(!menuToggle)}>
          <img src={IconMenu} alt="menu" className='w-8 h-8 xl:hidden' />
        </button>
        <h1 className='text-xl font-bold p-4'>GEMINI</h1>
      </div>
      {menuToggle && (
        <div className='absolute h-full top-0 left-0 xl:hidden'>
          <SideBar onToggle={() => setMenuToggle(!menuToggle)} />
        </div>
      )}
      <div className='max-w-[90%] w-full mx-auto mt-20 space-y-10'>
        {id ? <div className='flex flex-col space-y-4 p-4 h-[400px] overflow-x-hidden overflow-y-auto'>
          {Array.isArray(messageDetail) && messageDetail.map((item) => (
            <div className='flex space-y-6 flex-col' key={item.id}>
              <div className='flex flex-row space-x-6 items-baseline'>
                {item.isBot ? (
                  <>
                  <img src={IconStar} alt="star" className='w-8 h-8' />
                  <p dangerouslySetInnerHTML={{__html: item.text}}></p>
                  </>
                ) : (
                  <>
                  <p>User</p>
                  <p>{item.text}</p>
                  </>
                )}

              </div>

            </div>
          ))}

        </div> :
          <div className='flex flex-col space-y-5'>
            <div className='space-y-1'>
              <h2 className='bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-3xl inline-block text-transparent bg-clip-text font-bold'>Hello</h2>
              <p className='text-3xl '>How can I help you today</p>
            </div>
            <div className='flex items-center space-x-3'>
              <div className='w-[200px] h-[200px] bg-primaryBg-sideBar flex items-center justify-center rounded-lg' >
                <p>Dinner plan setting</p>
              </div>
              <div className='w-[200px] h-[200px] bg-primaryBg-sideBar flex items-center justify-center rounded-lg' >
                <p>New language sentence</p>
              </div>
              <div className='w-[200px] h-[200px] bg-primaryBg-sideBar flex items-center justify-center rounded-lg' >
                <p>Application letter writing tip</p>
              </div>
              <div className='w-[200px] h-[200px] bg-primaryBg-sideBar flex items-center justify-center rounded-lg flex-col' >
                <p>Create image with AI</p>
                <img src={TempImg} alt="temp image" className='p-4' />
              </div>
            </div>
          </div>
        }
        <div className='flex items-center space-x-4 w-full'>
          <input type="text" placeholder='Type instruction here' className='rounded-lg p-4 bg-primaryBg-default w-[90%] border'
            onChange={(e) => setinputChat(e.target.value)} value={inputChat} />
          <button className='p-4 rounded-lg bg-green-500 text-white' onClick={handleChatDetail}>Send</button>
        </div>
      </div>



    </div>
  )
}

export default ChatDetail