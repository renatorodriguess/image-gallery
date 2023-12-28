import React from "react";
import { ImageGallery } from "@/types/global.types"
import Image from "next/image"
import { twMerge } from "tailwind-merge";

interface ImageCard extends Partial<ImageGallery>{
  className?: string;
  onClick?: (id: string | number) => void;
}

const ImageOverlayCard = ({ slug, className = "" }: ImageCard) => {
  // Verifique se slug é uma string válida ou forneça um valor padrão
  const imageSrc = slug || "caminho_do_valor_padrao.jpg";

  return (
    <div className={twMerge("rounded-lg overflow-hidden border border-gray-300 group flex items-center justify-center h-full", className)}>
      <Image src={imageSrc} alt={imageSrc} className="block h-full w-full object-cover" />
    </div>
  )
}

export default ImageOverlayCard;
