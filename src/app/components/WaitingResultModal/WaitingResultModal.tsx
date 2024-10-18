import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Image,
} from '@nextui-org/react'
import React from 'react'

interface CustomWaitingResultModal {
  isOpen: boolean
  onClose: () => void
}

export default function WaitingResultModal({
  isOpen,
  onClose,
}: CustomWaitingResultModal) {
  return (
    <Modal
      scrollBehavior="outside"
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      closeButton={<img src="/closeicon.png" alt="close" />}
    >
      <ModalContent className="bg-[#1F67CE] text-white">
        {(onClose) => (
          <>
            <ModalHeader className="flex justify-start items-center space-x-2">
              <Image src="/whiteaccesstime.svg" alt="aguardando resultados" />
              <h1
                className={`font-chineseRocksRegular text-[24px] font-normal`}
              >
                Aguardando resultados
              </h1>
            </ModalHeader>
            <ModalBody>
              <h1
                className={`font-monumentExtendedRegular text-[12px] font-normal`}
              >
                O placar da partida será atualizado ao final da mesma, aguarde o
                resultado.
              </h1>
            </ModalBody>
            <ModalFooter>
              <Button
                onPress={onClose}
                className={` text-[14px] text-white font-bold bg-[#E40000] rounded-full w-full`}
              >
                Fechar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
