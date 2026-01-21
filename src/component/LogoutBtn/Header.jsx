import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appWrite/auth.js'
import { Container, Logo, LogoutBtn } from '../index.js'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
export default function Header() {
  const authStatus = useSelector((state) => state.auth.state)
  const navigate = useNavigate()
  const naItems = [
    {
      name:'Home',
      slug: "/",
      active: true
    },
    {
      name:"Login",
      slug:"/login",
      active: !authStatus,
    },
    {
      name:"Signup",
      slug:"/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]
  return (
    <div>Header</div>
  )
}