'use client'

import { initialImageData } from '@/data'
import { ImageGallery } from '@/types/global.types'
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, KeyboardSensor, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, arrayMove, rectSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useState } from 'react'
import ImageCard from '@/components/Cards/ImageCards'
import AddImageCard from '@/components/Cards/AddImageCard'
import ImageOverlayCard from '@/components/Cards/ImageOverlayCard'
import Header from '@/components/Header/Header'

export default function Home() {
  const [galleryData, setGalleryData] = useState(initialImageData);

  // handleSelectImage
  const handleSelectImage = (id: string | number) => {
    const newGalleryData = galleryData.map((imageItem) => {
      if(imageItem.id === id) {
        return {
          ...imageItem, isSelected: !imageItem.isSelected
        }
      }
      return imageItem;
    })
    setGalleryData(newGalleryData)
  }



  {/* dnd starts here*/}

  const [activeItem, setactiveItem] = useState<ImageGallery | null>(null)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    }),
    useSensor(TouchSensor)
  )

  const handleDragStart = (event: DragStartEvent) => {
    const {id} = event.active;
    if(!id) return;

    // current item
    const currentItem = galleryData.find((item) => item.id === id);


    setactiveItem(currentItem || null);
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setactiveItem(null);
    const {active, over} = event;
    if(!over) {
      return;
    }

    if(active.id !== over.id) {
      setGalleryData((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  };

  const handleDelete = (selectedItems: ImageGallery[]) => {
    // if galleryData.isSelected === true then filter out the selected items and return the rest
    const newGalleryData = galleryData.filter(
      (imageItem) => !selectedItems.includes(imageItem)
    );

    setGalleryData(newGalleryData);
  };

  //dnd ends here

  return (
    <div className='min-h-screen'>
      <div className='flex -col items-center justify-center'>
        <div className='bg-white my-8 rounded-lg shadow max-w-5xl grid divide-y'>
          <Header onDelete={handleDelete} galleryData={galleryData}/>

          {/* dnd context*/}
            <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            >
              <div className='grid grid-cols-2 md:grid-cols-5 gap-8 p-8'>
                <SortableContext  items={galleryData} strategy={rectSortingStrategy}>
                  {
                    galleryData.map((imageItem) => (
                      <ImageCard  key={imageItem.id}
                        id={imageItem.id}
                        isSelected={imageItem.isSelected}
                        slug={imageItem.slug}
                        onClick={handleSelectImage}
                      />
                    ))
                  }
                </SortableContext>
                <AddImageCard setGalleryData={setGalleryData}/>

                <DragOverlay adjustScale={true} wrapperElement='div'>
                  {
                    activeItem ? (<ImageOverlayCard className='absolute z-50 h-full w-full'slug={activeItem.slug}/>) : null
                  }
                  
                </DragOverlay>
              </div>
            </DndContext>

        </div>
      </div>
    </div>
  )
}
