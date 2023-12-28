'use client'

import ImageIcon from "@/assets/icons/ImageIcon"
import { ImageGallery } from "@/types/global.types"
import React, { useState } from "react"
import { twMerge } from "tailwind-merge"

interface AddImageCard {
    setGalleryData: React.Dispatch<React.SetStateAction<ImageGallery[]>>
}

const AddImageCard = ({setGalleryData}: AddImageCard) => {
    const [isModalOpen, setisModalOpen ] = useState(false)

  return (
    <>
        <button type="button"
        onClick={() => setisModalOpen(true)}   
        
        className={twMerge("rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors duration-500 aspect-square p-8")}>
            <ImageIcon />
            <p className="font-semibold tex-xs md:text-base whitespace-nowrap">Add Imagem</p>
        </button>
    </>
  )
}

export default AddImageCard