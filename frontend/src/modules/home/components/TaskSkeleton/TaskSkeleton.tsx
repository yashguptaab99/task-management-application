import { Skeleton } from '@mantine/core'

export default function TaskSkeleton() {
    const skeletonProps = {
        visible: true,
        height: 20,
        radius: 'xl',
    }

    const skeletonItems = [
        { width: '60%', mt: 40 },
        { width: '30%', mt: 6 },
    ]

    const repetitions = 8

    return (
        <>
            <Skeleton {...skeletonProps} width="20%" />
            {Array(repetitions * skeletonItems.length)
                .fill(null)
                .map((_, index) => (
                    <Skeleton
                        key={index}
                        {...skeletonProps}
                        width={skeletonItems[index % skeletonItems.length].width}
                        mt={skeletonItems[index % skeletonItems.length].mt}
                    />
                ))}
        </>
    )
}
