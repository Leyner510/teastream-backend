import type { SessionMetadata } from '@/src/shared/types/session-metadata.types'
import { Body, Head, Heading, Link, Preview, Section, Tailwind, Text } from '@react-email/components'
import { Html } from '@react-email/html'
import * as React from 'react'

interface PasswordRecoveryTepmlateProps {
    domain: string
    token: string
    metadata: SessionMetadata
}

export function PasswordRecoveryTepmlate ({domain, token, metadata}: PasswordRecoveryTepmlateProps) {
    const resetLink = `${domain}/accaunt/recovery/${token}`
    
    return (
        <Html>
            <Head />
            <Preview>Сброс пароля</Preview>
            <Tailwind>
                <Body className='max-w-2xl mx-auto p-6 bg-slate-50'>
                        <Section className='text-center mb-8'>
                            <Heading className='text-3xl text-black font-bold'>
                                Сброс пароля
                            </Heading>
                            <Text className='text-base text-black'>
                                Вы запросили сброс пароля для вашей учётной записи.
                            </Text>

                            <Text className='text-base text-black'>
                                Чтобы создать новый пароль, нажмите на ссылку ниже:
                            </Text>
                            <Link href={resetLink} className='inline-flex justify-center items-center rounded-md text-sm font-medium text-white bg-[#1889AE] px-5 py-2'>
                                Сбросить пароль
                            </Link>
                        </Section>  

                        <Section className='bg-gray-100 rounded-lg p-6 mb-6'></Section>
                            <Heading className='text-xl f font-semibold text-[#1889AE]'>
                                Информация о запросе:
                            </Heading>
                            <ul className='list-disc list-inside text-black mt-2'>
                                <li>Расположение: {metadata.location.country}</li>
                                <li>Операционная система: {metadata.device.os}</li>
                                <li>Браузер: {metadata.device.browser}</li>
                                <li>IP-адрес: {metadata.ip}</li>
                            </ul>
                            <Text className='text-gray-600 mt-2'>
                                Если вы не инициировали этот запрос, пожалуйста, игнорируйте это сообщение
                            </Text>
                        <Section className='text-center mt-8'>
                            <Text>
                            Если у вас есть вопросы или вы столкнулись с трудностями, не стесняйтесь обращаться в нашу службу поддержки по адресу{' '}
							<Link 
								href="mailto:help@teastream.ru" 
								className="text-[#18b9ae] underline"
							>
								help@teastream.ru
							</Link>.
                            </Text>

                        </Section>
                </Body>
            </Tailwind>
        </Html>
    )


}