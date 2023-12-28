'use client'

import ImageIcon from "@/assets/icons/ImageIcon"
import { ImageGallery } from "@/types/global.types"
import React, { useState } from "react"
import { twMerge } from "tailwind-merge"
import Modal from "../Modal/Modal"
import CloseIcon from "@/assets/icons/CloseIcon"
import { nanoid } from "nanoid"

interface AddImageCard {
    setGalleryData: React.Dispatch<React.SetStateAction<ImageGallery[]>>
}

const AddImageCard = ({setGalleryData}: AddImageCard) => {
    const [isModalOpen, setIsModalOpen ] = useState(false)
    const handleImageSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const imageURL = event.currentTarget["image-url"].value;

        if(!imageURL) return;

        setGalleryData((prev) => [
            ...prev, 
            {
            id: nanoid(),
            slug: imageURL,
            isSelected:false,
        }])

        setIsModalOpen(false);
    }

  return (
    <>
        <button type="button"
        onClick={() => setIsModalOpen(true)}   
        
        className={twMerge("rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors duration-500 aspect-square p-8")}>
            <ImageIcon />
            <p className="font-semibold tex-xs md:text-base whitespace-nowrap">Add Imagem</p>
        </button>
        <Modal open={isModalOpen} handleClose={() => setIsModalOpen(false)}modalId="addImageModal">
            <form onSubmit={handleImageSubmit} className="relative py-12 px-6 bg-neutral-50 rounded w-[680px] maw-h-[95vh]">
                <CloseIcon onClick={() => setIsModalOpen(false)} width={31} className="absolute top-4 right-4 cursor-pointer text-red-600 hover:text-red-700 transition-all"/>
                <h2 className="text-2xl font-semibold text-center mb-8 ">URL Da Imagem</h2>
                <input type="url" name="image-url" id="image-url" placeholder="https://exemplo.com/imagem.png"
                className="w-full border border-gray-300  p-4 rounded focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"/>
                <div className="flex justify-end mt-4">
                    <button type="submit" className="px-8 py-2.5 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors duration-500">Add Imagem</button>
                </div>
            </form>
        </Modal>
    </>
  )
}

export default AddImageCard