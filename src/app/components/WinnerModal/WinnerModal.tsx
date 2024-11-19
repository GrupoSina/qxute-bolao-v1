import React, { useEffect } from 'react'
import { useEventsContext } from '@/context/EventsContext'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from '@nextui-org/react'
import { Open_Sans as OpenSans } from 'next/font/google'
import { useState } from 'react'
import { MdOutlineCheckCircleOutline } from 'react-icons/md'
import MatchService from '@/services/api/models/match'
import { handleAxiosError } from '@/services/api/error'
import toast from 'react-hot-toast'
import { formatDateHourPrediction } from '@/utils/formatDate'
import { decodeToken } from '@/utils/jwt'
import { parseCookies } from 'nookies'

const fontOpenSans = OpenSans({ subsets: ['latin'] })

export default function WinnerModal() {
  const { 'qxute-bolao:x-token': sessionKey } = parseCookies()
  const decoded = decodeToken(sessionKey)
  const {
    visibleModalMatches,
    setVisibleModalMatches,
    selectedMatchWinner,
    setSelectedMatchWinner,
  } = useEventsContext()
  const [loading, setLoading] = useState(false)
  const [winner, setWinner] = useState<IWinner | undefined>()
  const [role, setRole] = useState<'ADMIN' | 'USER' | undefined>()

  useEffect(() => {
    if (sessionKey) {
      setRole(decoded?.role)
    }
  }, [sessionKey])

  useEffect(() => {
    if (selectedMatchWinner) {
      fetchWinnerByMatch()
    }
  }, [selectedMatchWinner])

  async function fetchWinnerByMatch() {
    if (selectedMatchWinner) {
      setLoading(true)
      try {
        const { fetchWinner } = await MatchService()
        const response = await fetchWinner(selectedMatchWinner.match.id)
        //console.log(response)
        setWinner(response)
        return response
      } catch (error) {
        const customError = handleAxiosError(error)
        toast.error(customError.message)
      } finally {
        setLoading(false)
      }
    }
  }

  async function sendSmsWinner() {
    if (selectedMatchWinner) {
      setLoading(true)
      try {
        const { sendSmsWinner } = await MatchService()
        const response = await sendSmsWinner(selectedMatchWinner.match.id)

        setVisibleModalMatches(undefined)
        toast.success('SMS Enviado')
        return response
      } catch (error) {
        const customError = handleAxiosError(error)
        toast.error(customError.message)
      } finally {
        setLoading(false)
      }
    }
  }

  function handleOnClose() {
    setSelectedMatchWinner(undefined)
    setVisibleModalMatches(undefined)
  }

  return (
    <Modal
      scrollBehavior="outside"
      isOpen={visibleModalMatches === 'winner'}
      onOpenChange={handleOnClose}
      size="xl"
      closeButton={<img src="/closeicon.png" alt="close" />}
    >
      <ModalContent className={`${fontOpenSans.className} bg-[#1F67CE]`}>
        {(onClose) => (
          <>
            <ModalHeader className="flex space-x-2 items-center text-white">
              <MdOutlineCheckCircleOutline size={24} />
              <h1 className="font-chineseRocksRegular text-[24px] font-normal">
                Vencedor(a)
              </h1>
            </ModalHeader>
            <ModalBody className="space-y-2 text-white">
              <p className="text-[12px] font-monumentExtendedRegular">
                Confira abaixo o resultado do evento{' '}
                {selectedMatchWinner?.match.teamHome.name} X{' '}
                {selectedMatchWinner?.match.teamAway.name + ' '}
                pela {' ' + selectedMatchWinner?.roundName}.
              </p>
              {loading ? (
                <Spinner />
              ) : (
                <>
                  {winner ? (
                    <div className="flex flex-col gap-2">
                      <p className="md:text-[11px] text-[8px] font-bold">
                        NOME
                      </p>
                      <hr />
                      <div className="mt-1">
                        <p className="md:text-[14px] text-[12px]">
                          {winner?.instagram}
                        </p>
                        <p className="md:text-[12px] text-[9px]">
                          {winner?.phone} /{' '}
                          {formatDateHourPrediction(winner?.predictionDate)}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p>Não houve vencedor nessa partida.</p>
                  )}
                </>
              )}
            </ModalBody>
            <ModalFooter className="flex flex-col space-y-4">
              {winner && role === 'ADMIN' && (
                <Button
                  isDisabled={!!loading || winner?.smsSentToWinner}
                  type="submit"
                  onPress={() => sendSmsWinner()}
                  className={`${fontOpenSans.className} text-[14px] text-white font-bold bg-[#00764B] rounded-full`}
                >
                  Enviar SMS
                </Button>
              )}

              <Button
                onPress={onClose}
                className={`${fontOpenSans.className} text-[14px] text-white font-bold bg-[#E40000] rounded-full`}
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
