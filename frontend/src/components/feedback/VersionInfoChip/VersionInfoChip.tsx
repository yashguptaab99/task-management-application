import { Chip } from '@mantine/core'

import classes from './VersionInfoChip.module.css'
import { VersionInfoChipProps } from './VersionInfoChip.types'

export function VersionInfoChip({ version }: VersionInfoChipProps) {
    return (
        <Chip checked={false} variant="filled" size="xs" className={classes.root}>
            {version}
        </Chip>
    )
}
