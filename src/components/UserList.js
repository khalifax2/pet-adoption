import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers, removeUser } from '../actions/userActions'
import ReactPaginate from 'react-paginate'
import Loader from '../components/Loader'
import Message from '../components/Message'

const UserList = ({ history }) => {
   const dispatch = useDispatch()

   const userList = useSelector((state) => state.userList)
   const { loading: loadingList, error, users } = userList

   const userRegister = useSelector((state) => state.userRegister)
   const { loading: loadingUserInfo, userInfo } = userRegister

   const userUpdate = useSelector((state) => state.userUpdate)
   const { loading: loadingUpdate, success: successUpdate } = userUpdate

   const [pageNumber, setPageNumber] = useState(0)

   const userPerPage = 6
   const currentPage = pageNumber * userPerPage

   useEffect(() => {
      if (!loadingUpdate) {
         dispatch(listUsers(pageNumber))
      }
   }, [dispatch, userInfo, successUpdate])

   const changePage = ({ selected }) => {
      setPageNumber(selected)
   }

   const pageCount = Math.ceil(users.length / userPerPage)

   const displayUsers = users
      .slice(currentPage, currentPage + userPerPage)
      .map((user) => {
         return (
            <tr key={user.userId}>
               <td>{user.firstName}</td>
               <td>{user.lastName}</td>
               <td>{user.email}</td>
               {user.address ? (
                  <td>{`${user.address.street} ${user.address.city} ${user.address.state}`}</td>
               ) : (
                  <td></td>
               )}
               <td style={{ padding: '0' }}>
                  <i
                     className='fas fa-edit'
                     onClick={() =>
                        history.push(`/admin/accounts/${user.userId}`)
                     }
                  ></i>

                  <i
                     className='fas fa-trash'
                     onClick={() => dispatch(removeUser(user.userId))}
                  ></i>
               </td>
            </tr>
         )
      })

   return (
      <>
         {loadingList || loadingUserInfo ? (
            <Loader />
         ) : error ? (
            <Message variant='error'>{error}</Message>
         ) : users && users.length === 0 ? (
            <h1>Empty List</h1>
         ) : (
            <>
               <Table striped bordered hover>
                  <thead>
                     <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th style={{ width: '10vh' }}></th>
                     </tr>
                  </thead>
                  <tbody>{displayUsers}</tbody>
               </Table>
               <ReactPaginate
                  previousLabel={'prev'}
                  nextLabel={'next'}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={'paginationBttns'}
                  previousLinkClassName={'previousBttn'}
                  nextLinkClassName={'nextBttn'}
                  disabledClassName={'paginationDisabled'}
                  activeClassName={'paginationActive'}
               />
            </>
         )}
      </>
   )
}

export default UserList
