import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { listMessages, removeMessage } from '../actions/contactActions'
import Loader from './Loader'
import Message from './Message'

const MessageList = ({ history }) => {
   const dispatch = useDispatch()

   const messageList = useSelector((state) => state.messageList)
   const { loading, error, messages } = messageList

   const [pageNumber, setPageNumber] = useState(0)

   useEffect(() => {
      dispatch(listMessages(pageNumber))
   }, [dispatch])

   const messagePerPage = 6
   const currentPage = pageNumber * messagePerPage

   const changePage = ({ selected }) => {
      setPageNumber(selected)
   }

   const pageCount = Math.ceil(messages.length / messagePerPage)

   const displayMessages = messages
      .slice(currentPage, currentPage + messagePerPage)
      .map((message) => {
         return (
            <tr key={message.id}>
               <td>{message.fullName}</td>
               <td>{message.email}</td>
               <td>
                  <p
                     style={{
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        width: '600px',
                        fontSize: '15px',
                     }}
                  >
                     {message.message}
                  </p>
               </td>
               <td style={{ padding: '0' }}>
                  <i
                     className='fas fa-eye'
                     onClick={() =>
                        history.push(`/admin/messages/${message.id}`)
                     }
                  ></i>
                  <i
                     className='fas fa-trash'
                     onClick={() => dispatch(removeMessage(message.id))}
                  ></i>
               </td>
            </tr>
         )
      })

   return (
      <>
         {loading ? (
            <Loader />
         ) : error ? (
            <Message variant='error'>{error}</Message>
         ) : messages && messages.length === 0 ? (
            <h1>Empty List</h1>
         ) : (
            <>
               <Table striped bordered hover>
                  <thead>
                     <tr>
                        <th style={{ width: '20vh' }}> Fullname</th>
                        <th style={{ width: '20vh' }}>Email</th>
                        <th>Message</th>
                        <th style={{ width: '10vh' }}></th>
                     </tr>
                  </thead>
                  <tbody>{displayMessages}</tbody>
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

export default MessageList
