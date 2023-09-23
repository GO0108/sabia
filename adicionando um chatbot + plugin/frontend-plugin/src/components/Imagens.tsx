import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { PhotoIcon } from '@heroicons/react/24/outline'
import ChatBot from './ChatBot'
import { Carousel } from '@material-tailwind/react';

interface query {
  query: string;
}

interface img {
  link: string
  source: string
}

interface buttonProps {
  query: any;
}

export const Imagens: React.FC<buttonProps> = ({query}) => {
  let [isOpen, setIsOpen] = useState(false)
  const [images, setImages] = useState([])

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
    catchImages(query)
  }

  const catchImages = async (query: query) => {
    const urlQuery = query
    let link = 'https://backend-flask-deploy.vercel.app/images/?url=' + urlQuery
      
      const res = await fetch(link, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const result = await res.json()
      console.log(result)
      setImages(result)
}

  return (
    <div className=''>
      <div className="">

        <div className='bg-neutral-50 text-sky-950 w-24 rounded-xl p-2' onClick={openModal}>
            <div className='flex justify-center items-center flex-col'>
              <PhotoIcon className='h-6 w-6 text-blue-400'/>
            </div>
            
            </div>
      </div>
    <div className='popupModal'>
    
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className=" z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className=" bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="absolute left-14 top-0">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="transform overflow-hidden rounded-2xl cs-border p-6 text-left  shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white"
                  >
                    Chatbot
                  </Dialog.Title>
                      <h1>{query}</h1>
                  <Carousel className="rounded-xl l-1 w-1/2 h-1/2">
                      {images.map((image: img) => (
                        <div>
                          <img src={`${image.link ? image.link : "d"}`} alt='img' className="object-cover"/>
                        </div>
                      ))}
                    </Carousel>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      fechar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      </div>
    </div>
  )
}
