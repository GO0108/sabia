import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { ChatBubbleBottomCenterTextIcon as Chat  } from '@heroicons/react/24/outline'
import ChatBot from './ChatBot'


export default function MyModal() {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <div className=''>
      <div className="">

        <div className='bg-neutral-50 text-sky-950 w-24 rounded-xl p-2' onClick={openModal}>
            <div className='flex justify-center items-center flex-col'>
              <Chat className='h-6 w-6 text-blue-400'/>
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
                  <ChatBot/>
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
