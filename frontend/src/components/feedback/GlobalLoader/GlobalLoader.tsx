import { memo } from 'react'

import { Flex, Image, ImageProps } from '@mantine/core'

import classes from './GlobalLoader.module.css'

export type GlobalLoaderProps = {
    logo: React.ReactNode
    alt: string
} & ImageProps

function $GlobalLoader({ logo, alt, ...imgProps }: GlobalLoaderProps) {
    return (
        <Flex className={classes.container} align="center" justify="center" direction="column">
            <div className={classes.logoContainer}>
                <Image src={logo} alt={alt} {...imgProps} />
            </div>
            <div className={classes.loader} />
        </Flex>
    )
}

export const GlobalLoader = memo($GlobalLoader)
