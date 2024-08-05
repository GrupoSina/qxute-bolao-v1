'use client'

import React from 'react'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { Open_Sans } from 'next/font/google'

const openSans = Open_Sans({
  subsets: ['latin'],
})

export default function OverallRules() {
  return (
    <div
      className={`bg-white-texture h-full ${openSans.className} flex flex-col`}
    >
      <h1 className="text-[#00409F] text-[18px] font-bold text-center py-6">
        Regras Gerais
      </h1>
      <Accordion variant="splitted" fullWidth defaultExpandedKeys={['1']}>
        <AccordionItem
          classNames={{
            base: 'bg-black',
            title: 'text-white text-[16px]',
            content: 'text-white',
          }}
          style={{
            backgroundColor: '#1F67CE',
          }}
          indicator={({ isOpen }) =>
            isOpen ? (
              <img
                src="/arrowup.svg"
                alt="arrow up"
                className="text-white text-[32px]"
              />
            ) : (
              <img
                src="/arrowdown.svg"
                alt="arrow down"
                className="text-white text-[32px]"
              />
            )
          }
          key={1}
          aria-label="Inscrição"
          title="Inscrição"
        >
          <hr
            style={{
              borderTopColor: 'white',
              opacity: '0.5',
              strokeWidth: '0.5px',
              marginTop: '-8px',
              marginBottom: '16px',
            }}
          />
          <div className="pb-4">
            <h1 className="text-[14px]">
              <span className="font-bold">Participação: </span>Qualquer pessoa
              pode participar desde que faça o seu cadastro no site.
            </h1>
          </div>
        </AccordionItem>
        <AccordionItem
          classNames={{
            base: 'bg-black',
            title: 'text-white text-[16px]',
            content: 'text-white',
          }}
          style={{
            backgroundColor: '#1F67CE',
          }}
          indicator={({ isOpen }) =>
            isOpen ? (
              <img
                src="/arrowup.svg"
                alt="arrow up"
                className="text-white text-[32px]"
              />
            ) : (
              <img
                src="/arrowdown.svg"
                alt="arrow down"
                className="text-white text-[32px]"
              />
            )
          }
          key={2}
          aria-label="Palpites"
          title="Palpites"
        >
          <hr
            style={{
              borderTopColor: 'white',
              opacity: '0.5',
              strokeWidth: '0.5px',
              marginTop: '-8px',
              marginBottom: '16px',
            }}
          />
          <div className="pb-4">
            <h1 className="text-[14px]">
              <span className="font-bold">Prazo: </span>Todos os palpites devem
              ser feitos antes do início de cada jogo ou evento. Formato: Os
              palpites devem ser submetidos no formato especificado (ex: placar
              exato, resultado final, etc.).
            </h1>
          </div>
        </AccordionItem>
        <AccordionItem
          classNames={{
            base: 'bg-black',
            title: 'text-white text-[16px]',
            content: 'text-white',
          }}
          style={{
            backgroundColor: '#1F67CE',
          }}
          indicator={({ isOpen }) =>
            isOpen ? (
              <img
                src="/arrowup.svg"
                alt="arrow up"
                className="text-white text-[32px]"
              />
            ) : (
              <img
                src="/arrowdown.svg"
                alt="arrow down"
                className="text-white text-[32px]"
              />
            )
          }
          key={3}
          aria-label="Premiação"
          title="Premiação"
        >
          <hr
            style={{
              borderTopColor: 'white',
              opacity: '0.5',
              strokeWidth: '0.5px',
              marginTop: '-8px',
              marginBottom: '16px',
            }}
          />
          <div className="pb-4">
            <h1 className="text-[14px]">
              <span className="font-bold">Distribuição de Prêmios: </span>Se
              você acertar o palpite, será enviado um SMS para o celular
              cadastrado no seu login. Entrega dos Prêmios: A nossa equipe
              entrará em contato através do seu WhatsApp pelo número cadastrado
              no seu login para lhe enviar a premiação.{' '}
            </h1>
          </div>
        </AccordionItem>
        <AccordionItem
          classNames={{
            base: 'bg-black',
            title: 'text-white text-[16px]',
            content: 'text-white',
          }}
          style={{
            backgroundColor: '#1F67CE',
          }}
          indicator={({ isOpen }) =>
            isOpen ? (
              <img
                src="/arrowup.svg"
                alt="arrow up"
                className="text-white text-[32px]"
              />
            ) : (
              <img
                src="/arrowdown.svg"
                alt="arrow down"
                className="text-white text-[32px]"
              />
            )
          }
          key={4}
          aria-label="Transparência"
          title="Transparência"
        >
          <hr
            style={{
              borderTopColor: 'white',
              opacity: '0.5',
              strokeWidth: '0.5px',
              marginTop: '-8px',
              marginBottom: '16px',
            }}
          />
          <div className="pb-4">
            <h1 className="text-[14px]">
              <span className="font-bold">Relatórios: </span>Você pode conferir
              os vencedores de outras rodadas no nosso site.{' '}
            </h1>
          </div>
        </AccordionItem>
        <AccordionItem
          classNames={{
            base: 'bg-black',
            title: 'text-white text-[16px]',
            content: 'text-white',
          }}
          style={{
            backgroundColor: '#1F67CE',
          }}
          indicator={({ isOpen }) =>
            isOpen ? (
              <img
                src="/arrowup.svg"
                alt="arrow up"
                className="text-white text-[32px]"
              />
            ) : (
              <img
                src="/arrowdown.svg"
                alt="arrow down"
                className="text-white text-[32px]"
              />
            )
          }
          key={5}
          aria-label="Penalidades e Desclassificação"
          title="Penalidades e Desclassificação"
        >
          <hr
            style={{
              borderTopColor: 'white',
              opacity: '0.5',
              strokeWidth: '0.5px',
              marginTop: '-8px',
              marginBottom: '16px',
            }}
          />
          <div className="pb-4">
            <h1 className="text-[14px]">
              <span className="font-bold">Conduta Inadequada: </span>Qualquer
              tentativa de fraude ou comportamento antidesportivo resultará em
              desclassificação do palpite e banimento da conta.
            </h1>
          </div>
        </AccordionItem>
        <AccordionItem
          className="mb-8"
          classNames={{
            base: 'bg-black',
            title: 'text-white text-[16px]',
            content: 'text-white',
          }}
          style={{
            backgroundColor: '#1F67CE',
          }}
          indicator={({ isOpen }) =>
            isOpen ? (
              <img
                src="/arrowup.svg"
                alt="arrow up"
                className="text-white text-[32px]"
              />
            ) : (
              <img
                src="/arrowdown.svg"
                alt="arrow down"
                className="text-white text-[32px]"
              />
            )
          }
          key={6}
          aria-label="Comunicação"
          title="Comunicação"
        >
          <hr
            style={{
              borderTopColor: 'white',
              opacity: '0.5',
              strokeWidth: '0.5px',
              marginTop: '-8px',
              marginBottom: '16px',
            }}
          />
          <div className="pb-4">
            <h1 className="text-[14px]">
              <span className="font-bold">Canal Oficial: </span>Os canais
              oficiais para informações sobre o bolão são esse site e a página
              do Instagram @_qxute.
            </h1>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
