import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const Dropzone = ({ setFile }) => {
   const onDrop = useCallback(async (acceptedFiles) => {
      const file = acceptedFiles[0]
      setFile(file)
   }, [])

   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

   return (
      <div {...getRootProps()}>
         <input {...getInputProps()} />
         {isDragActive ? (
            <p>Drop the files here ...</p>
         ) : (
            <p>
               Drag 'n' drop some files here, or click to select profile image
            </p>
         )}
      </div>
   )
}

export default Dropzone
