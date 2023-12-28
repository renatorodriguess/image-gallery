'use client'

import { initialImageData } from '@/data'
import { ImageGallery } from '@/types/global.types'
import { DndContext, DragEndEvent, DragStartEvent, KeyboardSensor, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, arrayMove, rectSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [galleryData, setgalleryData] = useState(initialImageData)

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
      setgalleryData((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  };

  //dnd ends here

  return (
    <div className='min-h-screen'>
      <div className='flex -col items-center justify-center'>
        <div className='bg-white my-8 rounded-lg shadow max-w-5xl grid divide-y'>
          <header className='text-2xl'>Showcase</header>

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
                      <div key={imageItem.id}>
                        <Image src={imageItem.slug} alt='' width={100} height={100}/>
                      </div>
                    ))
                  }


                </SortableContext>


              </div>
            </DndContext>

        </div>
      </div>
    </div>
  )
}
