import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { FooterWrapper } from './style'

interface IProps {
 children?: ReactNode
}

const AppFooter: FC<IProps> = () => {
 return <FooterWrapper>AppFooter</FooterWrapper>
}

export default memo(AppFooter)
