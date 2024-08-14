import React from 'react'
import IconPlus from '../assets/plusIcon.png'
import IconChat from '../assets/chat.png'
import Trash from '../assets/remove.png'
import IconMenu from '../assets/menu.png'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { addChat, removeChat } from '../store/chatSlice'
import { Link, useNavigate } from 'react-router-dom'

const SideBar = ({onToggle}) => {
  const dispatch = useDispatch();
  const {data} = useSelector((state) => state.chat)
  const navigate = useNavigate();


  const handleNewChat = () => {
    dispatch(addChat())
  }

  const handleRemoveChat = (id) => {
    dispatch(removeChat(id))
    navigate("/")
  }
  return (
    <div className='bg-primaryBg-sideBar w-[280px] h-screen text-white p-8'>
      <button className='flex ml-auto xl:hidden' onClick={onToggle}>
        <img src={IconMenu} alt="menu" className='w-10 h-10' />
      </button>
      <div className='mt-20'>
        <button className='px-4 py-1 flex items-center space-x-4 bg-gray-600 mb-10' onClick={handleNewChat}>
          <img src={IconPlus} alt="plus icon" className='w-4 h-4' />
          <p>New Chat</p>
        </button>
        <div className='space-y-4'>
          <p>Latest Chat</p>
          <div className='flex flex-col space-y-6'>
            {data.map((chat) => (
              <Link to={`chat/${chat.id}`} className='flex items-center justify-between p-2 bg-gray-800' key={chat?.id}>
                <div className='flex items-center space-x-4'>
                  <img src={IconChat} alt="chat icon" className='w-8 h-8' />
                  <p>{chat.title}</p>
                </div>
                <button className='flex items-center space-x-4' onClick={(e) => {
                  e.preventDefault();
                  handleRemoveChat(chat.id);
                }}>
                  <img src={Trash} alt="chat icon" className='w-5 h-5' />
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

SideBar.propTypes = {
  onToggle : PropTypes.func,
}

export default SideBar